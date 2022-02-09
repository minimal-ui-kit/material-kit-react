import './switch.css';
import React from 'react';
import Icon from '@mdi/react';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import { mdiCurtains, mdiCurtainsClosed, mdiPause } from '@mdi/js';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';

const gateway = 'http://192.168.88.122:1880';
class Switch extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      alignment: this.props.sVal
    };
  }
  handleSwitch = (e, val) => {
    //console.log(this.props.sName + ' is now ' + val);
    this.setState({ alignment: val });
    this.props.stateHandler(e.target.name, val);
    fetch(gateway + '/' + this.props.sID + '/' + val).then((response) => response.json());
  };

  render() {
    let { sVal, sID, sName, stateHandler } = this.props;
    return (
      <Card variant="outlined" elevation={0} sx={{ minWidth: 100, mb: 2, boxShadow: 0 }}>
        <CardHeader title={sName} />
        <CardContent style={{ display: 'flex', alignItems: 'center' }}>
          <ToggleButtonGroup color="secondary" value={this.state.alignment} exclusive onChange={this.handleSwitch}>
            <ToggleButton value="OPEN">
              <Icon path={mdiCurtains} size={2} />
            </ToggleButton>
            <ToggleButton value="STOP">
              <Icon path={mdiPause} size={2} />
            </ToggleButton>
            <ToggleButton value="CLOSE">
              <Icon path={mdiCurtainsClosed} size={2} />
            </ToggleButton>
          </ToggleButtonGroup>
        </CardContent>
      </Card>
    );
  }
}
export default Switch;
