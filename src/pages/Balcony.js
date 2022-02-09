// material
import { Box, Grid, Container, Typography, Button } from '@mui/material';
// components
import Page from '../components/Page';
import BalconyRoom from '../components/_dashboard/balcony';
import { mdiFoodForkDrink } from '@mdi/js';
import Iconm from '@mdi/react';

export default function Balcony() {
  return (
    <Page title="Dinning, Pooja and Balcony">
      <Container maxWidth="xl">
        <Box style={{ display: 'flex', alignItems: 'center' }} sx={{ pb: 3 }}>
        <Iconm path={mdiFoodForkDrink} width={22} height={22} />
          <Typography style={{ display: 'inline', marginLeft: '8px' }} variant="h4">Dining & Balcony</Typography>
        </Box>
        <BalconyRoom />
      </Container>
    </Page>
  );
}
