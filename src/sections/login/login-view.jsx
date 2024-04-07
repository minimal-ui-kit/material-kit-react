// eslint-disable-next-line import/no-extraneous-dependencies
import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Divider from '@mui/material/Divider';
import LoadingButton from '@mui/lab/LoadingButton';
import { alpha, useTheme } from '@mui/material/styles';

import { bgBlur, bgGradient } from 'src/theme/css';

import Logo from 'src/components/logo';

import { useRouter } from '../../routes/hooks';
import { useApi } from '../../redux/api-calls';
// ----------------------------------------------------------------------

export default function LoginView() {
  const theme = useTheme();
  const router = useRouter();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const [code] = useState(queryParams.get('code'));
  const [state] = useState(queryParams.get('state'));
  const [loading, setLoading] = useState(true);
  // const { fetchToken, fetchUser, setIsAuthenticated } = useContext(AppContext);
  const api = useApi();
  useEffect(() => {
    const setLocalStorage = async () => {
      if (code) {
        localStorage.setItem('code', code);
        localStorage.setItem('state', state);
        const tokenBool = await api.fetchToken(code);
        if (tokenBool) {
          if (await api.fetchUser()) {
            router.push('/');
          }
          setLoading(false);
        }
      } else {
        setLoading(false);
      }
    };
    setLocalStorage();
  }, [api, code, router, state]);
  // const [showPassword, setShowPassword] = useState(false);

  const handleClick = () => {
    window.open(
      // eslint-disable-next-line no-template-curly-in-string
      'https://auth.atlassian.com/authorize?audience=api.atlassian.com&client_id=7rH9MvAgcrUz4M7l1iABX84kySAL8iZn&scope=read%3Ame%20read%3Aaccount%20read%3Aservicedesk-request%20manage%3Aservicedesk-customer%20read%3Ajira-work%20manage%3Ajira-project%20write%3Ajira-work%20read%3Ajira-user%20manage%3Ajira-webhook%20manage%3Ajira-configuration&redirect_uri=http%3A%2F%2Flocalhost%3A3030%2Flogin&state=${YOUR_USER_BOUND_VALUE}&response_type=code&prompt=consent',
      '_self'
    );
  };

  const renderForm = (
    <>
      {/* <Stack spacing={3}> */}
      {/*  <TextField name="email" label="Email address" /> */}

      {/*  <TextField */}
      {/*    name="password" */}
      {/*    label="Password" */}
      {/*    type={showPassword ? 'text' : 'password'} */}
      {/*    InputProps={{ */}
      {/*      endAdornment: ( */}
      {/*        <InputAdornment position="end"> */}
      {/*          <IconButton onClick={() => setShowPassword(!showPassword)} edge="end"> */}
      {/*            <Iconify icon={showPassword ? 'eva:eye-fill' : 'eva:eye-off-fill'} /> */}
      {/*          </IconButton> */}
      {/*        </InputAdornment> */}
      {/*      ), */}
      {/*    }} */}
      {/*  /> */}
      {/* </Stack> */}

      {/* <Stack direction="row" alignItems="center" justifyContent="flex-end" sx={{ my: 3 }}> */}
      {/*  <Link variant="subtitle2" underline="hover"> */}
      {/*    Forgot password? */}
      {/*  </Link> */}
      {/* </Stack> */}

      <LoadingButton
        loading={loading}
        fullWidth
        size="large"
        type="submit"
        variant="contained"
        color="primary"
        onClick={handleClick}
      >
        Login with JIRA
      </LoadingButton>
    </>
  );

  return (
    <Box
      sx={{
        ...bgGradient({
          color: alpha(theme.palette.background.default, 0.1),
          imgUrl: '/assets/background/qdbg1.png',
        }),
        height: 1,
      }}
    >
      <Stack alignItems="center" justifyContent="center" sx={{ height: 1 }}>
        <Card
          sx={{
            p: 5,
            width: 1,
            maxWidth: 420,
            boxShadow: 'none',
            zIndex: theme.zIndex.appBar + 1,
            ...bgBlur({
              color: theme.palette.grey[700],
              blur: 10,
              opacity: 0.3,
            }),
          }}
        >
          {/* <Typography variant="h4">Sign in with JIRA</Typography> */}

          {/* <Typography variant="body2" sx={{ mt: 2, mb: 5 }}> */}
          {/*  Don’t have an account? */}
          {/*  <Link variant="subtitle2" sx={{ ml: 0.5 }}> */}
          {/*    Get started */}
          {/*  </Link> */}
          {/* </Typography> */}
          {/* <Stack direction="row" spacing={2}> */}
          {/*  <Button */}
          {/*    fullWidth */}
          {/*    size="large" */}
          {/*    color="inherit" */}
          {/*    variant="outlined" */}
          {/*    sx={{ borderColor: alpha(theme.palette.grey[500], 0.16) }} */}
          {/*  > */}
          {/*    <Iconify icon="eva:google-fill" color="#DF3E30" /> */}
          {/*  </Button> */}
          {/*  <Button */}
          {/*    fullWidth */}
          {/*    size="large" */}
          {/*    color="inherit" */}
          {/*    variant="outlined" */}
          {/*    sx={{ borderColor: alpha(theme.palette.grey[500], 0.16) }} */}
          {/*  > */}
          {/*    <Iconify icon="eva:facebook-fill" color="#1877F2" /> */}
          {/*  </Button> */}

          {/*  <Button */}
          {/*    fullWidth */}
          {/*    size="large" */}
          {/*    color="inherit" */}
          {/*    variant="outlined" */}
          {/*    sx={{ borderColor: alpha(theme.palette.grey[500], 0.16) }} */}
          {/*  > */}
          {/*    <Iconify icon="eva:twitter-fill" color="#1C9CEA" /> */}
          {/*  </Button> */}
          {/* </Stack> */}

          <Divider sx={{ my: 3 }}>
            <Logo />
          </Divider>

          {renderForm}
        </Card>
      </Stack>
    </Box>
  );
}
