import { useTranslation } from 'react-i18next';
import React, { useState, useContext, useCallback } from 'react';

import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import TextField from '@mui/material/TextField';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import LoadingButton from '@mui/lab/LoadingButton';
import InputAdornment from '@mui/material/InputAdornment';

import { useRouter } from 'src/routes/hooks';

import { LanguagePopover } from 'src/layouts/components/language-popover';

import { Iconify } from 'src/components/iconify';

import ForgotPassword from './forget-password';
import { AuthContext } from '../../contexts/auth-context';
import { authService } from '../../services/auth/auth-service';

// ----------------------------------------------------------------------

export function SignInView() {
  const router = useRouter();
  const { t } = useTranslation(['auth', 'common']);
  const [showPassword, setShowPassword] = useState(false);
  const { login } = useContext(AuthContext);
  const [emailError, setEmailError] = useState(false);
  const [emailErrorMessage, setEmailErrorMessage] = useState('');
  const [passwordError, setPasswordError] = useState(false);
  const [passwordErrorMessage, setPasswordErrorMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [loginError, setLoginError] = useState<string | null>(null);
  const [forgotPasswordOpen, setForgotPasswordOpen] = useState(false);

  const validateInputs = useCallback(() => {
    const email = document.getElementById('email') as HTMLInputElement;
    const password = document.getElementById('password') as HTMLInputElement;

    let isValid = true;

    if (!email.value || !/\S+@\S+\.\S+/.test(email.value)) {
      setEmailError(true);
      setEmailErrorMessage(t('auth:signIn.errors.invalidEmail'));
      isValid = false;
    } else {
      setEmailError(false);
      setEmailErrorMessage('');
    }

    if (!password.value || password.value.length < 6) {
      setPasswordError(true);
      setPasswordErrorMessage(t('auth:signIn.errors.passwordLength'));
      isValid = false;
    } else {
      setPasswordError(false);
      setPasswordErrorMessage('');
    }

    return isValid;
  }, [t]);

  const handleSubmit = useCallback(async () => {
    if (!validateInputs()) {
      return;
    }

    const email = (document.getElementById('email') as HTMLInputElement).value;
    const password = (document.getElementById('password') as HTMLInputElement).value;

    setLoading(true);
    setLoginError(null);

    try {
      const response = await authService.login({ email, password });
      login(response.token);
      router.push('/');
    } catch (error: any) {
      console.error('Login failed:', error);
      setLoginError(error?.message || 'Login failed. Please try again.');
    } finally {
      setLoading(false);
    }
  }, [login, router, validateInputs]);

  const handleForgotPasswordClick = () => {
    setForgotPasswordOpen(true);
  };

  const handleForgotPasswordClose = () => {
    setForgotPasswordOpen(false);
  };

  // @ts-ignore
  const renderForm = (
    <Box display="flex" flexDirection="column" alignItems="flex-end">
      <TextField
        error={emailError}
        helperText={emailErrorMessage}
        id="email"
        type="email"
        name="email"
        defaultValue={import.meta.env.VITE_DEMO_EMAIL}
        placeholder={t('auth:signIn.placeholders.email')}
        autoComplete="email"
        label={t('auth:signIn.labels.email')}
        autoFocus
        required
        fullWidth
        variant="outlined"
        sx={{ mb: 3 }}
        InputLabelProps={{ shrink: true }}
        color={emailError ? 'error' : 'primary'}
      />

      <Link variant="body2" color="inherit" sx={{ mb: 1.5 }} onClick={handleForgotPasswordClick}>
        {t('auth:signIn.forgotPassword')}
      </Link>

      <TextField
        error={passwordError}
        helperText={passwordErrorMessage}
        defaultValue={import.meta.env.VITE_DEMO_PASSWORD}
        label={t('auth:signIn.labels.password')}
        placeholder={t('auth:signIn.placeholders.password')}
        id="password"
        autoComplete="current-password"
        required
        fullWidth
        variant="outlined"
        color={passwordError ? 'error' : 'primary'}
        InputLabelProps={{ shrink: true }}
        type={showPassword ? 'text' : 'password'}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                <Iconify icon={showPassword ? 'solar:eye-bold' : 'solar:eye-closed-bold'} />
              </IconButton>
            </InputAdornment>
          ),
        }}
        sx={{ mb: 1.5 }}
      />
      {loginError && (
        <Typography color="error" align="left" sx={{ paddingBottom: 1.5, width: '100%' }}>
          {loginError}
        </Typography>
      )}
      <LoadingButton
        fullWidth
        size="large"
        type="submit"
        color="inherit"
        variant="contained"
        onClick={handleSubmit}
        disabled={loading}
      >
        {loading ? t('auth:signIn.buttons.signingIn') : t('auth:signIn.buttons.signIn')}
      </LoadingButton>
    </Box>
  );

  return (
    <>
      <Box 
        sx={{ 
          position: 'fixed',
          right: 24,
          top: 24,
          zIndex: 9999,
        }}
      >
        <LanguagePopover />
      </Box>

      <Box gap={1.5} display="flex" flexDirection="column" alignItems="center" sx={{ mb: 5 }}>
        <Typography variant="h5">{t('auth:signIn.title')}</Typography>
        <Typography variant="body2" color="text.secondary">
          {t('common:welcome')}
          <Link variant="subtitle2" sx={{ ml: 0.5 }}>
            {t('common:getStarted')}
          </Link>
        </Typography>
      </Box>

      {renderForm}

      <ForgotPassword open={forgotPasswordOpen} handleClose={handleForgotPasswordClose} />
    </>
  );
}
