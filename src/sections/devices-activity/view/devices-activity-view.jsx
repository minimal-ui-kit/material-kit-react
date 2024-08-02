import { useState, useEffect } from 'react';

import Stack from '@mui/material/Stack';
import Container from '@mui/material/Container';

import Typography from '@mui/material/Typography';
import DeviceTable from '../device-table';
import axios from 'axios';
import { Box, Grid } from '@mui/material';
import AnimatedComponent from 'src/components/animate/animatedComponent';

export default function DevicesActivityView() {
  const [devices, setDevices] = useState([]);
  const [deviceStatus, setDeviceStatus] = useState([]);
  const getDevices = async () => {
    try {
      const response = await axios.get(
        'https://api.2pay.uz/api/merchant/devices/broker-status-count/',
        {
          headers: {
            Authorization: 'Token ' + localStorage.getItem('token'),
          },
        }
      );
      // console.log(response.data);
      setDevices(response.data);
    } catch (error) {
      console.error(error);
    }
  };
  const getDeviceStatus = async () => {
    try {
      const response = await axios.get('https://api.2pay.uz/api/merchant/devices-status/', {
        headers: {
          Authorization: 'Token ' + localStorage.getItem('token'),
        },
      });
      console.log(response.data);
      setDeviceStatus(response.data);
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    getDevices();
    getDeviceStatus();
  }, []);
  const filterDevices = Object.groupBy(deviceStatus, ({ company }) => company?.id);

  return (
    <Container>
      <Typography variant="h4" sx={{ mb: 5, mt: 2 }}>
        Qurilmalar foaliyati{' '}
        <Typography variant="body" sx={{ color: 'text.secondary' }}>
          {` (${devices?.active_devices_count}-faol ${devices?.inactive_devices_count}-faol emas)`}
        </Typography>
      </Typography>
      <Box  sx={{ mt: 5 }}>
        {Object.keys(filterDevices).map((key, index) => (
          <AnimatedComponent key={index} >
            <DeviceTable  data={filterDevices[key]} />
          </AnimatedComponent>
        ))}
      </Box>
    </Container>
  );
}
