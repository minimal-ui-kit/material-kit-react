import { HTMLAttributes, useCallback, useEffect, useState } from 'react';

import LoadingButton from '@mui/lab/LoadingButton';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import Link from '@mui/material/Link';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';

import { useRouter } from 'src/routes/hooks';

import { Button } from '@mui/material';
import CountrySelect from 'src/components/country-select';
import { Iconify } from 'src/components/iconify';
import { CreateUserBody } from 'src/services/auth/auth.dto';
import AuthService from 'src/services/auth';
import { errCb } from 'src/utils';

// ----------------------------------------------------------------------

const SIGN_IN = {
  email: '',
  password: '',
};

const SIGN_UP = {
  fname: '',
  lname: '',
  country: '',
  email: '',
  password: '',
  pledgeAmount: 0,
  secret: '',
};

export function SignInView() {
  const router = useRouter();

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isSignin, setIsSignin] = useState(true);
  const [authenticating, setAuthenticating] = useState(false);
  const [confirmPass, setConfirmPass] = useState('');
  const [data, setData] = useState<Partial<CreateUserBody>>(SIGN_IN);

  const onGetStarted = () => {
    setIsSignin((val) => !val);
  };

  const onAuthenticate = async () => {
    try {
      setAuthenticating(true);
      if (isSignin) {
        if (!data.email || !data.password) {
          throw new Error('Email and password is required');
        } else {
          await AuthService.login({
            email: data.email!,
            password: data.password!,
          });
        }
      } else {
        const user = await AuthService.register(data as CreateUserBody);
      }
      router.replace('/');
    } catch (error) {
      errCb(error.message);
    } finally {
      setAuthenticating(false);
    }
  };

  const updateField = (field: keyof CreateUserBody, val: string) => {
    setData((value) => ({ ...value, [field]: val }));
  };

  const checkPass = useCallback(() => {
    if (data.password !== confirmPass && !isSignin) {
      return 'Passwords do not match';
    }
    return null;
  }, [data.password, confirmPass, isSignin]);

  const checkEmptyForm = useCallback(
    () => [...Object.values(data), !isSignin ? confirmPass : 'true'].some((val) => val === ''),
    [data, confirmPass, isSignin]
  );

  useEffect(() => {
    if (isSignin) {
      setData(SIGN_IN);
    } else {
      setData(SIGN_UP);
    }
  }, [isSignin]);

  const passErr = checkPass();
  const emptyForm = checkEmptyForm();

  const renderForm = (
    <Box display="flex" flexDirection="column" alignItems="flex-end">
      {!isSignin && (
        <TextField
          fullWidth
          name="code"
          label="Secret code"
          placeholder="xxxxxxxx"
          type="password"
          value={data.secret}
          required
          onChange={(e) => updateField('secret', e.target.value)}
          InputLabelProps={{ shrink: true }}
          sx={{ mb: 3 }}
          helperText={
            <Typography variant="caption" color="Highlight">
              Enter the secret code provided in your invite message.
            </Typography>
          }
        />
      )}
      {!isSignin && (
        <Box display="flex" gap={2}>
          <TextField
            fullWidth
            name="fname"
            label="First name"
            required
            placeholder="Akwesi"
            onChange={(e) => updateField('fname', e.target.value)}
            value={data.fname}
            InputLabelProps={{ shrink: true }}
            sx={{ mb: 3 }}
          />
          <TextField
            fullWidth
            name="lname"
            required
            label="Last name"
            placeholder="Gyamfi"
            onChange={(e) => updateField('lname', e.target.value)}
            InputLabelProps={{ shrink: true }}
            value={data.lname}
            sx={{ mb: 3 }}
          />
        </Box>
      )}
      <TextField
        fullWidth
        name="email"
        label="Email address"
        placeholder="hello@gmail.com"
        value={data.email}
        required
        onChange={(e) => updateField('email', e.target.value)}
        InputLabelProps={{ shrink: true }}
        sx={{ mb: 3 }}
      />
      {!isSignin && (
        <>
          <TextField
            fullWidth
            name="pledge"
            label="Monthly pledge (GHs)"
            placeholder="5000"
            value={data.pledgeAmount}
            required
            type="number"
            onChange={(e) => updateField('pledgeAmount', e.target.value)}
            InputLabelProps={{ shrink: true }}
            sx={{ mb: 3 }}
          />
          <Box sx={{ mb: 3 }} width="100%" display="block">
            <CountrySelect
              onChange={(e) => updateField('country', e.target.value as string)}
              required
            />
          </Box>
        </>
      )}

      {isSignin && (
        <Link variant="caption" color="inherit" sx={{ mb: 1.5, cursor: 'pointer' }}>
          Forgot password?
        </Link>
      )}

      <TextField
        fullWidth
        name="password"
        label="Password"
        value={data.password}
        placeholder="*********"
        InputLabelProps={{ shrink: true }}
        required
        type={showPassword ? 'text' : 'password'}
        onChange={(e) => updateField('password', e.target.value)}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton onClick={() => setShowPassword((val) => !val)} edge="end">
                <Iconify icon={showPassword ? 'solar:eye-bold' : 'solar:eye-closed-bold'} />
              </IconButton>
            </InputAdornment>
          ),
        }}
        sx={{ mb: 3 }}
      />
      {!isSignin && (
        <TextField
          fullWidth
          name="confirmPassword"
          label="Confirm password"
          placeholder="*********"
          value={confirmPass}
          required
          InputLabelProps={{ shrink: true }}
          FormHelperTextProps={{ sx: { color: 'tomato' } }}
          helperText={passErr}
          type={showConfirmPassword ? 'text' : 'password'}
          onChange={(e) => setConfirmPass(e.target.value)}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={() => setShowConfirmPassword((val) => !val)} edge="end">
                  <Iconify
                    icon={showConfirmPassword ? 'solar:eye-bold' : 'solar:eye-closed-bold'}
                  />
                </IconButton>
              </InputAdornment>
            ),
          }}
          sx={{ mb: 3 }}
        />
      )}

      <LoadingButton
        fullWidth
        size="large"
        type="button"
        color="inherit"
        variant="contained"
        loading={authenticating}
        onClick={onAuthenticate}
        disabled={emptyForm || !!passErr}
      >
        {isSignin ? 'Sign in' : 'Sign up'}
      </LoadingButton>
    </Box>
  );

  return (
    <>
      <Box gap={1.5} display="flex" flexDirection="column" alignItems="center" sx={{ mb: 5 }}>
        <Typography variant="h5">{!isSignin ? 'Sign up' : 'Sign in'}</Typography>
        <Typography variant="body2" color="text.secondary">
          Don’t have an account?
          <Button variant="text" onClick={onGetStarted} sx={{ ml: 0.5, cursor: 'pointer' }}>
            {isSignin ? 'Get started' : 'Login'}
          </Button>
        </Typography>
      </Box>
      <form>{renderForm}</form>

      {isSignin && (
        <>
          <Divider sx={{ my: 3, '&::before, &::after': { borderTopStyle: 'dashed' } }}>
            <Typography
              variant="overline"
              sx={{ color: 'text.secondary', fontWeight: 'fontWeightMedium' }}
            >
              OR
            </Typography>
          </Divider>

          <Box gap={1} display="flex" justifyContent="center">
            <IconButton color="inherit">
              <Iconify icon="logos:google-icon" />
            </IconButton>
          </Box>
        </>
      )}
    </>
  );
}
