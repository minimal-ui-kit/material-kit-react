// material
import { Box, Grid, Container, Typography } from '@mui/material';
// components
import Page from '../components/Page';
import DrawingRoom from '../components/_dashboard/drawing';
import { Icon, InlineIcon } from '@iconify/react';
import tvFill from '@iconify/icons-eva/tv-fill';
// ----------------------------------------------------------------------

export default function Drawing() {
  return (
    <Page title="Drawing room">
      <Container maxWidth="xl">
        <Box style={{ display: 'flex', alignItems: 'center' }} sx={{ pb: 3 }}>
          <InlineIcon width={'24'} icon={tvFill} />
          <Typography style={{ display: 'inline', marginLeft: '8px' }} variant="h4">
            Drawing Room
          </Typography>
        </Box>
        <DrawingRoom />
      </Container>
    </Page>
  );
}
