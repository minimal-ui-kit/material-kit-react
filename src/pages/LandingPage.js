import { Helmet } from 'react-helmet-async';
// @mui
import { styled } from '@mui/material/styles';
import { Typography, Container, Box } from '@mui/material';

// ----------------------------------------------------------------------

const StyledContent = styled('div')(({ theme }) => ({
  maxWidth: 550,
  margin: 'auto',
  minHeight: '100vh',
  display: 'flex',
  justifyContent: 'center',
  flexDirection: 'column',
  padding: theme.spacing(12, 0),
}));

// ----------------------------------------------------------------------

export default function LandingPage() {
  return (
    <>
      <Helmet>
        <title> Coming soon | Progress Pro </title>
      </Helmet>

      <Container>
        <StyledContent sx={{ textAlign: 'center', alignItems: 'center' }}>
          <Typography variant="h3" paragraph>
            Coming soon
          </Typography>

          <Typography sx={{ color: 'text.secondary' }}>
            Coming soon: a revolutionary new product that will change your life forever! Or at least until the next revolutionary new product comes out..
          </Typography>

          <Box
            component="img"
            src="/assets/illustrations/mad-designer.png"
            sx={{ height: 300, mx: 'auto', my: { xs: 5, sm: 10 } }}
          />

        </StyledContent>
      </Container>
    </>
  );
}
