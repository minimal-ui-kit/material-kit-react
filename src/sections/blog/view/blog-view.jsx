import { useState } from 'react';

import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Unstable_Grid2';
import Typography from '@mui/material/Typography';

import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile';
import { posts } from 'src/_mock/blog';

import FinancingCard from '../financing-card';
import DateRangePickerComponent from '../date-range-picker';
import formatDatePicker from '../../../utils/format-date-picker';
// ----------------------------------------------------------------------
import { Box } from '@mui/material';
import AnimatedComponent from 'src/components/animate/animatedComponent';

export default function BlogView() {
  const [isdatePicker, setIsDatePicker] = useState(false);
  const [range, setRange] = useState({
    after: formatDatePicker(new Date()),
    before: formatDatePicker(new Date()),
  });
  console.log(range);
  return (
    <Container>
      <Box sx={{ mb: 5, display: 'flex', alignItems: 'start', justifyContent: 'space-between' }}>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h4">Moliya</Typography>
        </Stack>

        <Stack
          mb={5}
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          spacing={2}
        >
          <Stack direction="row" alignItems="center" justifyContent="space-between">
            <Button
              onClick={() => setIsDatePicker(true)}
              variant="contained"
              startIcon={<CalendarMonthIcon />}
            >
              Sana oralig'i
            </Button>
          </Stack>
          <Stack direction="row" alignItems="center" justifyContent="space-between">
            <Button
              variant="contained"
              startIcon={<InsertDriveFileIcon />}
              sx={{ mr: 1, backgroundColor: '#388e3c' }}
            >
              Excel faylini yuklash
            </Button>
          </Stack>
        </Stack>
      </Box>
      <Stack direction="row" alignItems="center" justifyContent="space-between" mb={2}>
        {isdatePicker ? (
          <DateRangePickerComponent setIsDatePicker={setIsDatePicker} setRange={setRange} />
        ) : null}
      </Stack>
      <Grid container spacing={5}>
        {posts.map((post) => (
          <Grid key={post.id} item="true" xs={12} sm={6} md={4}>
            <AnimatedComponent>
              <FinancingCard />
            </AnimatedComponent>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}
