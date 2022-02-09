import './switch.css';
import './zone.css';
import React from 'react';
import Icon from '@mdi/react';
import Button from '@mui/material/Button';
import { mdiCeilingFan, mdiLightbulbVariantOutline, mdiCurtains, mdiCurtainsClosed, mdiTelevision, mdiCoachLamp, mdiVanityLight, mdiStringLights } from '@mdi/js';

const gateway = 'http://192.168.88.122:1880';
class Switch extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      style: { background: 'red', color: 'white' }
    };
  }
  handleSwitch = (e) => {
    var onOff = e.target.checked ? 'on' : 'off';
    console.log(e.target.name + ' is ' + onOff);
    this.props.stateHandler(e.target.name, onOff.toUpperCase());
    fetch(gateway + '/' + e.target.name + '/' + onOff).then((response) => response.json());
  };

  render() {
    const { style } = this.state;
    let { sVal, zoneClass, sID, sIcon, sName, stateHandler } = this.props;

    return (
      <Button className={sVal === 'ON' ? 'switch-on' : 'switch-off'} variant={sVal === 'ON' ? 'contained' : 'outlined'} size="large" color="secondary" disableFocusRipple={true}>
        <input type="checkbox" checked={sVal === 'ON' ? true : false} onChange={this.handleSwitch} id={sID} name={sID} />
        <label htmlFor={sID}>
          <div className="content">
            <div className={'zone ' + zoneClass}>
              <span>
                <div></div>
              </span>
              <span>
                <div></div>
              </span>
              <span>
                <div></div>
              </span>
              <span>
                <div></div>
              </span>
              <span>
                <div></div>
              </span>
              <span>
                <div></div>
              </span>
              {zoneClass.includes('zone33') ? (
                <>
                  <span>
                    <div></div>
                  </span>
                  <span>
                    <div></div>
                  </span>
                  <span>
                    <div></div>
                  </span>
                </>
              ) : (
                ''
              )}
            </div>
            <div>{sName}</div>
          </div>
        </label>
      </Button>
    );
  }
}
export default Switch;
