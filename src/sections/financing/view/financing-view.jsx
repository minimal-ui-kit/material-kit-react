import { useEffect, useState } from 'react';

import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Unstable_Grid2';
import Typography from '@mui/material/Typography';

import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile';
import { posts } from 'src/_mock/blog';

import FinancingCard from '../financing-card';
import DateRangePickerComponent from '../../../utils/date-range-picker';
import formatDatePicker from '../../../utils/format-date-picker';
// ----------------------------------------------------------------------
import { Box, useMediaQuery, useTheme } from '@mui/material';
import AnimatedComponent from 'src/components/animate/animatedComponent';
import CompanyTable from '../company-card';

import axios from 'axios';
import axiosInstance from 'src/routes/axios-config';
import ExcelDownload from 'src/utils/excel-download';
import { useQueries, useQuery } from '@tanstack/react-query';
import LoadingSpinner from 'src/components/loading/loading';

export default function FinancingView() {
  const [isdatePicker, setIsDatePicker] = useState(false);
  const [range, setRange] = useState({
    after: formatDatePicker(new Date()),
    before: formatDatePicker(new Date()),
  });

  // const [filials, setFilials] = useState([]);
  // const [filialDetails, setFilialDetails] = useState([]);
  // useEffect(() => {
  //   const getFilials = async () => {
  //     try {
  //       const response = await axios.get(`https://api.2pay.uz/api/merchant/filials/`, {
  //         headers: {
  //           Authorization: 'Token ' + localStorage.getItem('token'),
  //         },
  //       });
  //       console.log(response.data);
  //       setFilials(response.data);
  //     } catch (error) {
  //       console.error(error);
  //     }
  //   };
  //   getFilials();
  // }, []);
  const {
    data: filials,
    isLoading: isLoadingFilials,
    error,
  } = useQuery({
    queryKey: ['filials'],
    queryFn: () => axiosInstance.get('/merchant/filials/').then((res) => res.data),
    onError: (error) => {
      console.log(error);
    },
  });
  // useEffect(() => {
  //   filials.map((filial) => {
  //     const getFilialDetails = async () => {
  //       try {
  //         const response = await axios.get(
  //           `https://api.2pay.uz/api/merchant/financing/filial=${filial.id}/?after=${range?.after}&before=${range.before}`,
  //           {
  //             headers: {
  //               Authorization: 'Token ' + localStorage.getItem('token'),
  //             },
  //           }
  //         );
  //         console.log(response.data);
  //         setFilialDetails((prev) => [...prev, response.data]);
  //       } catch (error) {
  //         console.error(error);
  //       }
  //     };
  //     getFilialDetails();
  //   });
  // }, [range, filials]);
  const queries = useQueries({
    queries: filials?.map((filial) => ({
      queryKey: ['filialDetails', filial.id, range],
      queryFn: () =>
        axiosInstance
          .get(
            `/merchant/financing/filial=${filial.id}/?after=${range?.after}&before=${range.before}`
          )
          .then((res) => res.data),
    })) || [],
  });

  const isFetching = queries?.some((query) => query.isLoading);
  const filialDetails =  queries?.flatMap((query) => (query.data ? [query.data] : []));

  const formattedData = filialDetails?.map((detail) => ({
    ID: detail.id,
    Nomi: detail.name,
    'Click service ID': detail.service_id,
    'Telefon raqami': detail.phone_number,
    'Qurilmalar soni': detail.devices_count,
    "Naqd to'lovlar": detail.cash.amount,
    "Naqd to'lovlar soni": detail.cash.count,
    'Onlayn tolovlar': detail.click.amount,
    'Onlayn tolovlar soni': detail.click.count,
    'Admin tolovlar': detail.manual.amount ? detail.manual.amount : 0,
    'Admin tolovlar soni': detail.manual.count ? detail.manual.count : 0,
  }));
  if (isFetching || isLoadingFilials) return <LoadingSpinner />;
  return (
    <Container>
      <Box sx={{ mb: 5, display: 'flex', alignItems: 'start', justifyContent: 'space-between' }}>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h4" sx={{ fontSize: { xs: '20px', sm: '24px' }, mr: 1 }}>
            Moliya
          </Typography>
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
              sx={{ fontSize: { xs: '8px', sm: '14px' } }}
              startIcon={<CalendarMonthIcon />}
            >
              Sana oralig'i
            </Button>
          </Stack>
          <Stack direction="row" alignItems="center" justifyContent="space-between">
            <ExcelDownload title="FilialDetails" formattedData={formattedData} />
          </Stack>
        </Stack>
      </Box>
      <Stack direction="row" alignItems="center" justifyContent="space-between" mb={2}>
        {isdatePicker ? (
          <DateRangePickerComponent
            setIsDatePicker={setIsDatePicker}
            setRange={(a) => {
              setRange(a);
            }}
          />
        ) : null}
      </Stack>

      <Grid container spacing={5}>
        <Grid item="true" xs={12} sm={6} md={4}>
          <AnimatedComponent>
            <CompanyTable range={range} />
          </AnimatedComponent>
        </Grid>

        {filialDetails?.map((filialDetail) => (
          <Grid sx={{ width: '100%' }} key={filialDetail.id} item xs={12} sm={6} md={4}>
            <AnimatedComponent>
              <FinancingCard
                id={filialDetail.id}
                name={filialDetail.name}
                cash={filialDetail.cash}
                click={filialDetail.click}
                devices_count={filialDetail.devices_count}
                manual={filialDetail.manual}
              />
            </AnimatedComponent>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}
