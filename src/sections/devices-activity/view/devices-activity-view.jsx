import { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import Stack from '@mui/material/Stack';
import Container from '@mui/material/Container';

import Typography from '@mui/material/Typography';
import DeviceTable from '../device-table';
import axiosInstance from 'src/routes/axios-config';
import { Box, Grid } from '@mui/material';
import AnimatedComponent from 'src/components/animate/animatedComponent';
import LoadingSpinner from 'src/components/loading/loading';

export default function DevicesActivityView() {
  const {
    data: devicesActivity,
    error: devicesActivityError,
    isLoading: devicesActivityLoading,
  } = useQuery({
    queryKey: ['devicesActivity'],
    queryFn: () =>
      axiosInstance.get('/merchant/devices/broker-status-count/').then((res) => res.data),
    onError: (error) => {
      console.log(error);
    },
  });

  const {
    data: deviceStatus,
    error: deviceStatusError,
    isLoading: deviceStatusLoading,
  } = useQuery({
    queryKey: ['deviceStatus'],
    queryFn: () => axiosInstance.get('/merchant/devices-status/').then((res) => res.data),
    onError: (error) => {
      console.log(error);
    },
  });

  if (devicesActivityError || deviceStatusError) return 'An error has occurred: ' + error;
  if (devicesActivityLoading || deviceStatusLoading) return <LoadingSpinner />;

  const filterDevices = Object.groupBy(deviceStatus, ({ company }) => company?.id);

  return (
    <Container>
      <Typography variant="h4" sx={{ mb: 5, mt: 2, fontSize: { xs: '18px', md: '24px' } }}>
        Qurilmalar foaliyati{' '}
        <Typography variant="body" sx={{ color: 'text.secondary' }}>
          {` (${devicesActivity?.active_devices_count}-faol ${devicesActivity?.inactive_devices_count}-faol emas)`}
        </Typography>
      </Typography>
      <Box sx={{ mt: 5 }}>
        {Object.keys(filterDevices).map((key, index) => (
          <AnimatedComponent key={index}>
            <DeviceTable data={filterDevices[key]} />
          </AnimatedComponent>
        ))}
      </Box>
    </Container>
  );
}
