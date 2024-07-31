import 'react-date-range/dist/styles.css'; // asosiy uslub fayli
import 'react-date-range/dist/theme/default.css'; // mavzu css fayli

import { Box, Typography, Button, Stack } from '@mui/material';
import React, { useState } from 'react';
import { DateRangePicker } from 'react-date-range';

import formatDatePicker from '../../utils/format-date-picker';

const DateRangePickerComponent = ({ setIsDatePicker, setRange }) => {
  const [state, setState] = useState([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: 'selection',
    },
  ]);
  const getDatePicker = () => {
    const startDate = formatDatePicker(state[0].startDate);
    const endDate = formatDatePicker(state[0].endDate);
    setRange({ startDate, endDate });
    setIsDatePicker(false);
    console.log(startDate, endDate);
    return { startDate, endDate };
  };
  const handleDateChange = (item) => {
    setState([item.selection]);
  };
  // Sanalarni formatlash funksiyasi (o'zbek tilida)

  return (
    <Box component={'div'} sx={{ mx:"auto", color: 'text.secondary', backgroundColor: '#fff', p: 2, boxShadow: 1, borderRadius: 1 }}>
      <DateRangePicker
        showDateDisplay={false}
        showSelectionPreview={false}
        ranges={state}
        onChange={handleDateChange}
      />

      <Typography variant="body2" color="text.secondary"  sx={{ mb: 2 }}>
        Tanlangan sanalar:{' '}
        {`${formatDatePicker(state[0]?.startDate)} ~ ${formatDatePicker(state[0]?.endDate)}`}
      </Typography>

      <Stack direction="row" alignItems="center"  spacing={2}>
        <Button onClick={getDatePicker} variant="contained" color="secondary">
          Tanlash
        </Button>
        <Button onClick={() => setIsDatePicker(false)}  variant="contained" color='error'>
          Bekor qilish
        </Button>
      </Stack>
    </Box>
  );
};

export default DateRangePickerComponent;
