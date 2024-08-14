import React from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';

const LoadingSpinner = ({ size = 80 }) => {
  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '100vh',
        // backgroundColor: 'rgba(0, 0, 0, 0.5)', 
        opacity: 0.5, // Orqa fonni qorong'i qilish uchun
      }}
    >
      <CircularProgress size={size} />
    </Box>
  );
};

export default LoadingSpinner;
