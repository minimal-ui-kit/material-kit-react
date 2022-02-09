// material
import { Box, Grid, Container, Typography, Button } from '@mui/material';
// components
import Page from '../components/Page';
import OfficeRoom from '../components/_dashboard/office';
import { InlineIcon } from '@iconify/react';
import monitorFill from '@iconify/icons-eva/monitor-fill';

// ----------------------------------------------------------------------

export default function Office() {
  return (
    <Page title="Office room">
      <Container maxWidth="xl">
        <Box style={{ display: 'flex', alignItems: 'center' }} sx={{ pb: 3 }}>
          <InlineIcon width={'24'} icon={monitorFill} />
          <Typography style={{ display: 'inline', marginLeft: '8px' }} variant="h4">
            Office Room
          </Typography>
        </Box>
        <OfficeRoom />
      </Container>
    </Page>
  );
}
