import { Link as RouterLink } from 'react-router-dom';
// material
import { styled } from '@mui/material/styles';
import { Card, Stack, Link, Container, Typography, Alert } from '@mui/material';
// layouts
import AuthLayout from '../layouts/AuthLayout';
// components
import Page from '../components/Page';
import { LoginForm } from '../sections/authentication/login';

// ----------------------------------------------------------------------

const RootStyle = styled(Page)(({ theme }) => ({
  [theme.breakpoints.up('md')]: {
    display: 'flex'
  }
}));

const SectionStyle = styled(Card)(({ theme }) => ({
  width: '100%',
  maxWidth: 464,
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  margin: theme.spacing(2, 0, 2, 2)
}));

const ContentStyle = styled('div')(({ theme }) => ({
  maxWidth: 480,
  margin: 'auto',
  display: 'flex',
  minHeight: '100vh',
  flexDirection: 'column',
  justifyContent: 'center',
  padding: theme.spacing(12, 0)
}));

// ----------------------------------------------------------------------

export default function Auth() {
  return (
    <RootStyle title="Authentication | GCT">
      {/* <AuthLayout /> */}

      <SectionStyle sx={{ display: { xs: 'none', md: 'flex' } }}>
        <Typography variant="h3" sx={{ px: 5, mt: 5, mb: 3 }}>
          Hi, [Name Surname] Your Access Is
        </Typography>
        <img src="/static/illustrations/tick.png" alt="access-granted" />
      </SectionStyle>

      <Container maxWidth="sm">
        <ContentStyle>
          <Stack sx={{ mb: 1 }}>
            <img src="/static/logo.png" width="80%" height="20%" alt="gazelle creek technologies" />
            <Typography variant="h4" gutterBottom>
              Use your either your Tag Card, Fingure or Face for your access to be granted
            </Typography>
          </Stack>
          <Stack sx={{ width: '100%' }} spacing={2}>
            <Alert variant="outlined" severity="info">
              Your Temperature is 28 C
            </Alert>
            <Alert variant="outlined" severity="error">
              Please wear your face mask
            </Alert>
            <Alert variant="outlined" severity="success">
              RFID card detected
            </Alert>
          </Stack>
        </ContentStyle>
      </Container>
    </RootStyle>
  );
}
