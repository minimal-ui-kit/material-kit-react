import { useState, useEffect } from 'react';
import axios from 'axios';
import { Link as RouterLink } from 'react-router-dom';
// @mui
import { styled } from '@mui/material/styles';
import { Card, Link, Container, Typography } from '@mui/material';
// hooks
import env from "react-dotenv";

import useResponsive from '../hooks/useResponsive';
// components
import Page from '../components/Page';
import Logo from '../components/Logo';
// sections
import { LoginForm } from '../sections/auth/login';
import AuthSocial from '../sections/auth/AuthSocial';

// ----------------------------------------------------------------------

const RootStyle = styled('div')(({ theme }) => ({
  [theme.breakpoints.up('md')]: {
    display: 'flex',
  },
}));

const HeaderStyle = styled('header')(({ theme }) => ({
  top: 0,
  zIndex: 9,
  lineHeight: 0,
  width: '100%',
  display: 'flex',
  alignItems: 'center',
  position: 'absolute',
  padding: theme.spacing(3),
  justifyContent: 'space-between',
  [theme.breakpoints.up('md')]: {
    alignItems: 'flex-start',
    padding: theme.spacing(7, 5, 0, 7),
  },
}));

const SectionStyle = styled(Card)(({ theme }) => ({
  width: '100%',
  maxWidth: 464,
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  margin: theme.spacing(2, 0, 2, 2),
}));

const ContentStyle = styled('div')(({ theme }) => ({
  maxWidth: 480,
  margin: 'auto',
  minHeight: '100vh',
  display: 'flex',
  justifyContent: 'center',
  flexDirection: 'column',
  padding: theme.spacing(12, 0),
}));

// ----------------------------------------------------------------------

export default function Login() {
  const smUp = useResponsive('up', 'sm');

  const mdUp = useResponsive('up', 'md');
  const [isAuthen, setAuthen] = useState(false)

  useEffect(()=>{
    axios({
      method: 'post',
      url: `${process.env.REACT_APP_API_URL}/api/login`,
      data: { "phone": '', "passwd": ''},
      withCredentials: true,
      headers: {'Access-Control-Allow-Origin': '*', 'Content-Type': 'application/json'}
      
    }).then(res => {
      if (res.data.authen === true){
        setAuthen(true)
      }});
    
  }, [])
  return (
    <Page title="Login">
      <RootStyle>
        <HeaderStyle>
          <Logo />
<<<<<<< Updated upstream

          {smUp && (
=======
          {smUp && !isAuthen && (
>>>>>>> Stashed changes
            <Typography variant="body2" sx={{ mt: { md: -2 } }}>
              Don’t have an account? {''}
              <Link variant="subtitle2" component={RouterLink} to="/register">
<<<<<<< Updated upstream
                Get started
=======
                Đăng ký
>>>>>>> Stashed changes
              </Link>
            </Typography>
          )}
        </HeaderStyle>

        {mdUp && (
          <SectionStyle>
            <Typography variant="h3" sx={{ px: 5, mt: 10, mb: 5 }}>
              Chào mừng quay lại
            </Typography>
            <img src="/static/illustrations/illustration_login.png" alt="login" />
          </SectionStyle>
        )}

        <Container maxWidth="sm">
          <ContentStyle>
            <Typography variant="h4" gutterBottom>
              Sign in to Minimal
            </Typography>

            <Typography sx={{ color: 'text.secondary', mb: 5 }}>Enter your details below.</Typography>

            <AuthSocial />

            <LoginForm />

            {!smUp && !isAuthen && (
              <Typography variant="body2" align="center" sx={{ mt: 3 }}>
                Don’t have an account?{' '}
                <Link variant="subtitle2" component={RouterLink} to="/register">
<<<<<<< Updated upstream
                  Get started
=======
                  Đăng ký
>>>>>>> Stashed changes
                </Link>
              </Typography>
            )}
          </ContentStyle>
        </Container>
      </RootStyle>
    </Page>
  );
}
