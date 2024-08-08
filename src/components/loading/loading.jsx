import React from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';

const LoadingSpinner = ({ message = 'Loading...', size = 40 }) => {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '100vh',
      }}
    >
      <CircularProgress size={size} />
      <Box sx={{ mt: 2, fontSize: '1rem', color: 'text.secondary' }}>{message}</Box>
    </Box>
  );
};

export default LoadingSpinner;
