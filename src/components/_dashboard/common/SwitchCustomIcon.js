import './switch.css';
import React from 'react';
import Button from '@mui/material/Button';

const gateway = 'http://192.168.88.122:1880';
class SwitchCustomIcon extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      style: { background: 'red', color: 'white' }
    };
  }
  handleSwitch = (e) => {
    var onOff = e.target.checked ? 'on' : 'off';
    //console.log(e.target.name + ' is ' + onOff);
    this.props.stateHandler(e.target.name, onOff.toUpperCase());
    fetch(gateway + '/' + e.target.name + '/' + onOff).then((response) => response.json());
  };

  render() {
    const { style } = this.state;
    let { sVal, sID, sIcon, sName, stateHandler } = this.props;

    return (
      <Button className={sVal === 'ON' ? 'switch-on' : 'switch-off'} variant={sVal === 'ON' ? 'contained' : 'outlined'} size="large" color="secondary" disableFocusRipple={true}>
        <input type="checkbox" checked={sVal === 'ON' ? true : false} onChange={this.handleSwitch} id={sID} name={sID} />
        <div className="content">
          <label htmlFor={sID}>
            {React.createElement(sIcon, { size: '48' }, [])}
            <div>{sName}</div>
          </label>
        </div>
      </Button>
    );
  }
}
export default SwitchCustomIcon;
