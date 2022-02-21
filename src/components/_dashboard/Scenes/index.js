import React from 'react';
import { mdiMovieOpen, mdiLedStripVariant, mdiWallSconceFlat, mdiTelevision, mdiCoachLamp, mdiVanityLight, mdiStringLights, mdiCheckboxBlankCircleOutline, mdiCircle } from '@mdi/js';
import { GiByzantinTemple, GiElectricalSocket, GiCandleFlame } from 'react-icons/gi';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Icon from '@mdi/react';

const gateway = 'http://192.168.88.122:1880';
const ICON_HEIGHT= 42;

class Scenes extends React.Component {
  constructor(props) {
    super(props);
  }
  handleMovieMode = (e) => {
    fetch(gateway + '/movietime/').then((response) => response.json());
  };

  handleCozyMode = (e) => {
    fetch(gateway + '/dinningcozy/').then((response) => response.json());
  };

  render() {
    return (
      <>
        <Grid container spacing={2}>
          <Grid item>
            <Button style={{ height: 100 }} variant="outlined" onClick={this.handleMovieMode} size="large" color="secondary" disableFocusRipple={true}>
              <div className="content">
                <Icon path={mdiMovieOpen} size={1.5} />
                <div>Movie mode</div>
              </div>
            </Button>
          </Grid>
          <Grid item>
            <Button style={{ height: 100 }} variant="outlined" onClick={this.handleCozyMode} size="large" color="secondary" disableFocusRipple={true}>
              <div className="content">
                <GiCandleFlame size={ICON_HEIGHT} />
                <div>Cozy mode</div>
              </div>
            </Button>
          </Grid>
        </Grid>
      </>
    );
  }
}
export default Scenes;
