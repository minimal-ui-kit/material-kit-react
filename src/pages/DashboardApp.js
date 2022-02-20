import { Box, Grid, Container, Typography, Button, IconButton } from '@mui/material';
import { NavLink } from 'react-router-dom';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import Page from '../components/Page';
import React from 'react';
import tvFill from '@iconify/icons-eva/tv-fill';
import monitorFill from '@iconify/icons-eva/monitor-fill';
import { InlineIcon } from '@iconify/react';
import { mdiFoodForkDrink } from '@mdi/js';
import Iconm from '@mdi/react';
import { mdiCountertop, mdiTeddyBear, mdiBed, mdiSofa } from '@mdi/js';
import ReactWeather from 'react-open-weather';
import 'react-open-weather/lib/css/ReactWeather.css';
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
          <Box sx={{ pb: 3 }}>
            <Typography variant="h4">Dashboard</Typography>
          </Box>
          <Grid container spacing={2}>
            <Grid sm={12} md={6} item lg={8}>
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
            </Grid>
            <Grid item sm={12} md={6} lg={4}>
              <ReactWeather forecast="5days" apikey="7ad07aac9b0943040a4abdd2c23dfc4e" type="city" city="Hyderabad" />
            </Grid>
          </Grid>
        </Container>
      </Page>
    );
  }

  NavLink(path, val, icon, isCustomm) {
    return (
      <NavLink style={{ textDecoration: 'none' }} to={path}>
        <Button style={{ background: '#f1f1f470', color: '#999999', height: 100, fontWeight: 800, border: 0 }} value="office" variant="outlined" size="large" disableFocusRipple={true}>
          <div className="content">
            {!isCustomm ? <Iconm path={icon} width={48} height={48} /> : <InlineIcon width={'48'} icon={icon} />}
            <div style={{ color: '#666666' }}>{val}</div>
          </div>
        </Button>
      </NavLink>
    );
  }
}
export default DashboardApp;
