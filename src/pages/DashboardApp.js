
// @mui
import { Container, Typography } from '@mui/material';
// components
import Page from '../components/Page';
// sections

// ----------------------------------------------------------------------

export default function DashboardApp() {

  return (
    <Page title="Dashboard">
      <Container maxWidth="xl">
        <Typography variant="h4" sx={{ mb: 5 }}>
          Hi, Welcome back
        </Typography>
      </Container>
    </Page>
  );
}
