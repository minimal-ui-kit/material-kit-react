import { Box, Typography, Card, CardContent } from '@mui/material';
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const FilialCard = ({ filial }) => {
 

  
  return (
    <Box sx={{ minWidth: 275 }}>
      <Card sx={{ minWidth: 275, backgroundColor: '#b9f6ca', maxHeight: 265 }} variant="outlined">
        <CardContent sx={{ lineHeight: '20px' }}>
          <Typography
            variant="h5"
            sx={{ fontSize: 14, textAlign: 'center' }}
            color="text.secondary"
            gutterBottom
          >
            {filial?.name}{' '}
          </Typography>
          <Typography color={'text.primary'} variant="subtitle1" component="div">
            Qurilmalar:{' '}
            <Box component={'span'} sx={{ fontWeight: 'fontWeightBold', color: 'text.secondary' }}>
              {' '}
              {filial?.devices_count} ta
            </Box>
          </Typography>
          <Typography color={'text.primary'} variant="subtitle1" component="div">
            click xizmati identifikatori:{' '}
            <Box component={'span'} sx={{ fontWeight: 'fontWeightBold', color: 'text.secondary' }}>
              {' '}
              {filial?.service_id} 
            </Box>
          </Typography>
          <Typography color={'text.primary'} variant="subtitle1" component="div">
            Naqd pul tolovlari:{' '}
            <Box component={'span'} sx={{ fontWeight: 'fontWeightBold', color: 'text.secondary' }}>
              {' '}
              {filial?.cash?.amount} so'm <br /> ({filial?.cash?.count} ta
              transaksiya)
            </Box>
          </Typography>
          <Typography color="text.primary" variant="subtitle1" component="div">
            Onlayn tolovlar:{' '}
            <Box component={'span'} sx={{ fontWeight: 'fontWeightBold', color: 'text.secondary' }}>
              {filial?.click?.amount} so'm <br />({filial?.click?.count} ta
              transaksiya)
            </Box>
          </Typography>
          <Typography variant="subtitle1">
            Admin to'lovlari:{' '}
            <Box component={'span'} sx={{ fontWeight: 'fontWeightBold', color: 'text.secondary' }}>
              {filial?.manual?.amount === null ? 0 : filial?.manual?.amount} so'm{' '}
              <br />({filial?.manual?.count} ta transaksiya)
            </Box>
          </Typography>
        </CardContent>
      </Card>
    </Box>
  );
};

export default FilialCard;
