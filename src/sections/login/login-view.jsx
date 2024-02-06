// eslint-disable-next-line import/no-extraneous-dependencies
import { useLocation } from 'react-router-dom';
import { useState, useEffect, useContext } from 'react';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';
import LoadingButton from '@mui/lab/LoadingButton';
import { alpha, useTheme } from '@mui/material/styles';

import { bgGradient } from 'src/theme/css';

import Logo from 'src/components/logo';

import { useRouter } from '../../routes/hooks';
import { AppContext } from '../../context/app-context';
// ----------------------------------------------------------------------

export default function LoginView() {
  const theme = useTheme();
  const router = useRouter();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const [code] = useState(queryParams.get('code'));
  const [state] = useState(queryParams.get('state'));
  const [loading, setLoading] = useState(true);
  const { fetchToken, fetchUser, setIsAuthenticated } = useContext(AppContext);
  useEffect(() => {
    const setLocalStorage = async () => {
      if (code) {
        localStorage.setItem('code', code);
        localStorage.setItem('state', state);
        const tokenBool = await fetchToken(code);
        if (tokenBool) {
          if (await fetchUser()) {
            setLoading(false);
            setIsAuthenticated(true);
            router.push('/');
          }
          setLoading(false);
        }
      } else {
        setLoading(false);
      }
    };
    setLocalStorage();
  }, [state, code, router, fetchToken, fetchUser, setIsAuthenticated]);
  // const [showPassword, setShowPassword] = useState(false);

  const handleClick = () => {
    window.open(
      // eslint-disable-next-line no-template-curly-in-string
      'https://auth.atlassian.com/authorize?audience=api.atlassian.com&client_id=7rH9MvAgcrUz4M7l1iABX84kySAL8iZn&scope=read%3Ame%20read%3Aservicedesk-request%20manage%3Aservicedesk-customer%20read%3Ajira-work%20manage%3Ajira-project%20write%3Ajira-work&redirect_uri=http%3A%2F%2Flocalhost%3A3030%2Flogin&state=${YOUR_USER_BOUND_VALUE}&response_type=code&prompt=consent',
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
        color="inherit"
        onClick={handleClick}
      >
        login
      </LoadingButton>
    </>
  );

  return (
    <Box
      sx={{
        ...bgGradient({
          color: alpha(theme.palette.background.default, 0.9),
          imgUrl: '/assets/background/overlay_4.jpg',
        }),
        height: 1,
      }}
    >
      <Logo
        sx={{
          position: 'fixed',
          top: { xs: 16, md: 24 },
          left: { xs: 16, md: 24 },
        }}
      />

      <Stack alignItems="center" justifyContent="center" sx={{ height: 1 }}>
        <Card
          sx={{
            p: 5,
            width: 1,
            maxWidth: 420,
          }}
        >
          <Typography variant="h4">Sign in with JIRA</Typography>

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
            <Typography variant="body2" sx={{ color: 'text.secondary' }} />
          </Divider>

          {renderForm}
        </Card>
      </Stack>
    </Box>
  );
}
