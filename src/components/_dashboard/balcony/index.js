import React from 'react';
import Switch from '../common/Switch';
import SwitchCustomIcon from '../common/SwitchCustomIcon';
import Zone from '../common/Zone';
import Curtain from '../common/Curtain';
import { mdiMovieOpen, mdiLedStripVariant, mdiLightbulbVariantOutline, mdiTelevision, mdiCoachLamp, mdiVanityLight, mdiStringLights, mdiChandelier , mdiCircle } from '@mdi/js';
import Grid from '@mui/material/Grid';
import Slider from '@mui/material/Slider';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import Typography from '@mui/material/Typography';
import CardContent from '@mui/material/CardContent';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import IconButton from '@mui/material/IconButton';
import Button from '@mui/material/Button';
import Icon from '@mdi/react';
import {decodeHtml } from '../../../utils/commons';
import { mdiHandsPray } from '@mdi/js';
import { GiByzantinTemple, GiElectricalSocket, GiCandleFlame } from "react-icons/gi";
import { FaFan } from "react-icons/fa";
import { MdBalcony } from "react-icons/md";

const gateway = 'http://192.168.88.122:1880';
class BalconyArea extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      bchandlier: 'OFF',
      poojaroompanel: 'OFF',
      dlight1: 'OFF',
      dlight2: 'OFF',
      dinningcenterzone: 'OFF',
      dinningaczone: 'OFF',
      poojaroom: 'OFF',
      bcolor: 5,
      bbrightness: 5,
      bsheer: 'CLOSE',
      bblackout: 'CLOSE',
      bzone: 'OFF',
      bexhaust: 'OFF',
      bsocket: 'OFF',
      balconyzone: 'OFF',
      bsocket: 'OFF',
      bexhaust: 'OFF'
    };
  }

  stateHandler(obj, val) {
    this.setState({
      [obj]: val
    });
  }

  handleColor = (e, v) => {
    fetch(gateway + '/dinningcolor/' + v * 20).then((response) => response.json());
  };

  handleBrightness = (e, v) => {
    fetch(gateway + '/dinningbrightness/' + v * 20).then((response) => response.json());
  };

  handleCozyMode = (e) => {
    fetch(gateway + '/dinningcozy/').then((response) => response.json());
  };

  componentDidMount() {
    var that = this;
    fetch(gateway + '/bboardtwostatus')
      .then((response) => response.text())
      .then((data) => {
        data = JSON.parse(decodeHtml(data));
        this.setState({ bsocket: data['1'].power });
        this.setState({ bexhaust: data['2'].power });
      });    
    fetch(gateway + '/bsheercurtainstatus')
      .then((response) => response.text())
      .then((data) => {
        data = JSON.parse(decodeHtml(data));
        this.setState({ bsheer: data['1'].curtain });
      });
    fetch(gateway + '/bblackoutcurtainstatus')
      .then((response) => response.text())
      .then((data) => {
        data = JSON.parse(decodeHtml(data));
        this.setState({ bblackout: data['1'].curtain });
      });    
    fetch(gateway + '/dinningboardstatus')
      .then((response) => response.text())
      .then((data) => {
        data = decodeHtml(data);
        data = JSON.parse(data);
        var speed = data['1'].speed;
        this.setState({ bbrightness: Math.round(speed / 20) });
        speed = data['2'].speed;
        this.setState({ bcolor: Math.round(speed / 20) });
        this.setState({ dinningcenterzone: data['5'].power });
        this.setState({ poojaroom: data['7'].power });
        this.setState({ dinningaczone: data['3'].power });
      });
      fetch(gateway + '/poojaboardstatus')
      .then((response) => response.text())
      .then((data) => {
        data = decodeHtml(data);
        data = JSON.parse(data);
        this.setState({ poojaroompanel: data['1'].power });
        this.setState({ poojaroomunderlight: data['2'].power });
      });
      fetch(gateway + '/dinningboardtwostatus')
      .then((response) => response.text())
      .then((data) => {
        data = decodeHtml(data);
        data = JSON.parse(data);
        this.setState({ dlight1: data['1'].power });
        this.setState({ dlight2: data['2'].power });
        this.setState({ bchandlier: data['4'].power });
        this.setState({ dlight3: data['3'].power });
        this.setState({ loading: false });
      });
  }
  render() {
    var stateHandler = this.stateHandler;
    return (
      <>
        {this.state.loading ? (
          <div>Loading</div>
        ) : (
          <>
            <Card sx={{ minWidth: 100, mb: 2 }}>
              <CardHeader
                action={
                  <IconButton aria-label="settings">
                    <MoreVertIcon />
                  </IconButton>
                }
                title="Zones"
              />
              <CardContent style={{ display: 'flex', alignItems: 'center' }}>
                <Grid container spacing={2}>
                  <Grid item>
                    <Zone sVal={this.state.dinningaczone} zoneClass="zone33 zone33left" sID="dinningaczone" sIcon={mdiStringLights} sName="AC" stateHandler={stateHandler.bind(this)}></Zone>
                  </Grid>
                  <Grid item>
                    <Zone sVal={this.state.dinningcenterzone} zoneClass="zone33 zone33center" sID="dinningcenterzone" sIcon={mdiStringLights} sName="Center" stateHandler={stateHandler.bind(this)}></Zone>
                  </Grid>
                  <Grid item>
                    <Switch sVal={this.state.poojaroom} sID="poojaroom" sIcon={mdiHandsPray} sName="Pooja" stateHandler={stateHandler.bind(this)}></Switch>
                  </Grid>
                  <Grid item>
                    <SwitchCustomIcon sVal={this.state.balconyzone} sID="balconyzone" sIcon={MdBalcony} sName="Balcony" stateHandler={stateHandler.bind(this)}></SwitchCustomIcon>
                  </Grid>                                
                  <Grid item>
                    <Card variant="outlined" sx={{ minWidth: 150, boxShadow: 0 }}>
                      <CardContent style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                          Color
                        </Typography>
                        <Slider defaultValue={this.state.bcolor} step={1} marks min={1} max={5} track={false} color="secondary" valueLabelDisplay="auto" onChangeCommitted={this.handleColor} />
                      </CardContent>
                    </Card>
                  </Grid>
                  <Grid item>
                    <Card variant="outlined" sx={{ minWidth: 150, boxShadow: 0 }}>
                      <CardContent style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                          Brightness
                        </Typography>
                        <Slider defaultValue={this.state.bbrightness} step={1} marks min={1} max={5} track={false} color="secondary" valueLabelDisplay="auto" onChangeCommitted={this.handleBrightness} />
                      </CardContent>
                    </Card>
                  </Grid>
                </Grid>
              </CardContent>
            </Card>
            <Card sx={{ minWidth: 100, mb: 2 }}>
              <CardHeader
                action={
                  <IconButton aria-label="settings">
                    <MoreVertIcon />
                  </IconButton>
                }
                title="Switches"
              />
              <CardContent style={{ display: 'flex', alignItems: 'center' }}>
                <Grid container spacing={2}>
                  <Grid item>
                    <Switch sVal={this.state.bchandlier} sID="bchandlier" sIcon={mdiChandelier} sName="Chandlier" stateHandler={stateHandler.bind(this)}></Switch>
                  </Grid>
                  <Grid item>
                    <SwitchCustomIcon sVal={this.state.poojaroompanel} sID="poojaroompanel" sIcon={GiByzantinTemple} sName="Pooja room panel" stateHandler={stateHandler.bind(this)}></SwitchCustomIcon>
                  </Grid>
                  <Grid item>
                    <Switch sVal={this.state.poojaroomunderlight} sID="poojaroomunderlight" sIcon={mdiChandelier} sName="Pooja room under light" stateHandler={stateHandler.bind(this)}></Switch>
                  </Grid>
                  <Grid item>
                    <SwitchCustomIcon sVal={this.state.bsocket} sID="bsocket" sIcon={GiElectricalSocket} sName="Balcony socket" stateHandler={stateHandler.bind(this)}></SwitchCustomIcon>
                  </Grid>     
                  <Grid item>
                    <SwitchCustomIcon sVal={this.state.bexhaust} sID="bexhaust" sIcon={FaFan} sName="Balcony exhaust" stateHandler={stateHandler.bind(this)}></SwitchCustomIcon>
                  </Grid> 
                  <Grid item>
                    <Switch sVal={this.state.dlight1} sID="dlight1" sIcon={mdiLightbulbVariantOutline} sName="Dinning light 1" stateHandler={stateHandler.bind(this)}></Switch>
                  </Grid>
                  <Grid item>
                    <Switch sVal={this.state.dlight2} sID="dlight2" sIcon={mdiLightbulbVariantOutline} sName="Dinning light 2" stateHandler={stateHandler.bind(this)}></Switch>
                  </Grid>
                  <Grid item>
                    <Switch sVal={this.state.dlight3} sID="dlight3" sIcon={mdiLightbulbVariantOutline} sName="Dinning light 3" stateHandler={stateHandler.bind(this)}></Switch>
                  </Grid>                                                      
                </Grid>
              </CardContent>
            </Card>
            <Card sx={{ minWidth: 100, mb: 2 }}>
              <CardHeader title="Curtains" />
              <CardContent style={{ display: 'flex', alignItems: 'center' }}>
                <Grid container spacing={2}>
                  <Grid item>
                    <Curtain sVal={this.state.bsheer} sID="bsheer" sName="Sheer curtain" stateHandler={stateHandler.bind(this)}></Curtain>
                  </Grid>
                  <Grid item>
                    <Curtain sVal={this.state.bblackout} sID="bblackout" sName="Blackout curtain" stateHandler={stateHandler.bind(this)}></Curtain>
                  </Grid>
                </Grid>
              </CardContent>
            </Card>            
            <Card sx={{ minWidth: 100, mb: 2 }}>
              <CardHeader title="Scenes" />
              <CardContent style={{ display: 'flex', alignItems: 'center' }}>
                <Grid item xs={6}>
                  <Button style={{ height: 100 }} variant="contained" onClick={this.handleCozyMode} size="large" color="primary" disableFocusRipple={true}>
                    <div className="content">
                      <GiCandleFlame size={48} />
                      <div>Cozy mode</div>
                    </div>
                  </Button>
                </Grid>
              </CardContent>
            </Card>
          </>
        )}
      </>
    );
  }
}
export default BalconyArea;
