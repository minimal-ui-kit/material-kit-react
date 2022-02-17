// material
import { Box, Grid, Container, Typography, Button } from '@mui/material';
// components
import Page from '../components/Page';
import BedRoom from '../components/_dashboard/bedroom';
import { InlineIcon } from '@iconify/react';
import monitorFill from '@iconify/icons-eva/monitor-fill';
import {mdiBed } from '@mdi/js';

// ----------------------------------------------------------------------

export default function Office() {
  return (
    <Page title="Office room">
      <Container maxWidth="xl">
        <Box style={{ display: 'flex', alignItems: 'center' }} sx={{ pb: 3 }}>
          <InlineIcon width={'24'} icon={mdiBed} />
          <Typography style={{ display: 'inline', marginLeft: '8px' }} variant="h4">
            Bed Room
          </Typography>
        </Box>
        <BedRoom />
      </Container>
    </Page>
  );
}
