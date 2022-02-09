import { Box, Grid, Container, Typography, Button, IconButton } from '@mui/material';
import { NavLink } from 'react-router-dom';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import Page from '../components/Page';
import React from 'react';
import Icon from '@mdi/react';
import { mdiMovieOpen, mdiLedStripVariant, mdiWallSconceFlat, mdiTelevision, mdiCoachLamp, mdiVanityLight, mdiStringLights, mdiCheckboxBlankCircleOutline, mdiCircle } from '@mdi/js';
import tvFill from '@iconify/icons-eva/tv-fill';
import monitorFill from '@iconify/icons-eva/monitor-fill';
import { InlineIcon } from '@iconify/react';
import { mdiFoodForkDrink } from '@mdi/js';
import Iconm from '@mdi/react';
import { mdiCountertop, mdiTeddyBear, mdiBed, mdiSofa } from '@mdi/js';

class DashboardApp extends React.Component {
  constructor(props) {
    super(props);
  }

  routeChange(e) {
    window.location.href = '/dashboard/' + e;
  }

  render() {
    return (
      <Page title="Myhome E302">
        <Container maxWidth="xl">
          <Box sx={{ pb: 5 }}>
            <Typography variant="h4">Dashboard</Typography>
          </Box>
          <Card>
            <CardHeader title="Rooms" />
            <CardContent>
              <Grid container spacing={2}>
                <Grid item>{this.NavLink('/dashboard/drawing', 'Drawing', tvFill, true)}</Grid>
                <Grid item>{this.NavLink('/dashboard/office', 'Office', monitorFill, true)}</Grid>
                <Grid item>{this.NavLink('/dashboard/kids', 'Kids', mdiTeddyBear, false)}</Grid>
                <Grid item>{this.NavLink('/dashboard/living', 'Living', mdiSofa, false)}</Grid>
                <Grid item>{this.NavLink('/dashboard/balcony', 'Dinning, Balcony', mdiFoodForkDrink, false)}</Grid>
                <Grid item>{this.NavLink('/dashboard/bedroom', 'Bedroom', mdiBed, false)}</Grid>
                <Grid item>{this.NavLink('/dashboard/kitchen', 'Kitchen', mdiCountertop, false)}</Grid>
              </Grid>
            </CardContent>
          </Card>
        </Container>
      </Page>
    );
  }

  NavLink(path, val, icon, isCustomm) {
    return (
      <NavLink style={{ textDecoration: 'none' }} to={path}>
        <Button style={{ background: '#444444', color: 'white', height: 100 }} value="office" variant="contained" size="large" color="primary" disableFocusRipple={true}>
          <div className="content">
            {!isCustomm ? <Iconm path={icon} width={48} height={48} /> : <InlineIcon width={'48'} icon={icon} />}
            <div>{val}</div>
          </div>
        </Button>
      </NavLink>
    );
  }
}
export default DashboardApp;
