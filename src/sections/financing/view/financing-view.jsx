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
import DateRangePickerComponent from '../date-range-picker';
import formatDatePicker from '../../../utils/format-date-picker';
// ----------------------------------------------------------------------
import { Box } from '@mui/material';
import AnimatedComponent from 'src/components/animate/animatedComponent';
import CompanyTable from '../company-card';

import axios from 'axios';

import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';

export default function FinancingView() {
  const [isdatePicker, setIsDatePicker] = useState(false);
  const [range, setRange] = useState({
    after: formatDatePicker(new Date()),
    before: formatDatePicker(new Date()),
  });

  const [filials, setFilials] = useState([]);
  const [filialDetails, setFilialDetails] = useState([]);
  useEffect(() => {
    const getFilials = async () => {
      try {
        const response = await axios.get(`https://api.2pay.uz/api/merchant/filials/`, {
          headers: {
            Authorization: 'Token ' + localStorage.getItem('token'),
          },
        });
        console.log(response.data);
        setFilials(response.data);
      } catch (error) {
        console.error(error);
      }
    };
    getFilials();
  }, []);
  useEffect(() => {
    filials.map((filial) => {
      const getFilialDetails = async () => {
        try {
          const response = await axios.get(
            `https://api.2pay.uz/api/merchant/financing/filial=${filial.id}/?after=${range?.after}&before=${range.before}`,
            {
              headers: {
                Authorization: 'Token ' + localStorage.getItem('token'),
              },
            }
          );
          // console.log(response.data);
          setFilialDetails((prev) => [...prev, response.data]);
        } catch (error) {
          console.error(error);
        }
      };
      getFilialDetails();
    });
  }, [range, filials]);
  const handleDownloadExcel = () => {
    const formattedData = filialDetails.map((detail) => ({
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
    const ws = XLSX.utils.json_to_sheet(formattedData);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'FilialDetails');

    const excelBuffer = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
    const data = new Blob([excelBuffer], { type: 'application/octet-stream' });
    saveAs(data, 'FilialDetails.xlsx');
  };
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
              onClick={handleDownloadExcel}
            >
              Excel faylini yuklash
            </Button>
          </Stack>
        </Stack>
      </Box>
      <Stack direction="row" alignItems="center" justifyContent="space-between" mb={2}>
        {isdatePicker ? (
          <DateRangePickerComponent
            setIsDatePicker={setIsDatePicker}
            setRange={(a) => {
              setFilialDetails([]);
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

        {filialDetails.map((filialDetail) => (
          <Grid key={filialDetail.id} itemxs={12} sm={6} md={4}>
            <AnimatedComponent>
              <FinancingCard
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
