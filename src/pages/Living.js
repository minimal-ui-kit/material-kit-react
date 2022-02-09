// material
import { Box, Grid, Container, Typography, Button } from '@mui/material';
// components
import Page from '../components/Page';
import Livingroom from '../components/_dashboard/living';
import { mdiSofa } from '@mdi/js';
import Iconm from '@mdi/react';

export default function Living() {
  return (
    <Page title="Living">
      <Container maxWidth="xl">
        <Box style={{ display: 'flex', alignItems: 'center' }} sx={{ pb: 3 }}>
        <Iconm path={mdiSofa} width={22} height={22} />
          <Typography style={{ display: 'inline', marginLeft: '8px' }} variant="h4">Living</Typography>
        </Box>
        <Livingroom />
      </Container>
    </Page>
  );
}
