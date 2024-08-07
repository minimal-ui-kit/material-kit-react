import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { Container,Stack, Grid,  Button } from '@mui/material';
import FilialCard from '../filial-card';
import DeviceCard from '../device-card';
import ExcelDownload from 'src/utils/excel-download';
import DateRangePickerComponent from 'src/utils/date-range-picker';
import AnimatedComponent from 'src/components/animate/animatedComponent';
import formatDatePicker from 'src/utils/format-date-picker';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
const DevicesDetailView = () => {
   const [isdatePicker, setIsDatePicker] = useState(false);
   const [range, setRange] = useState({
     after: formatDatePicker(new Date()),
     before: formatDatePicker(new Date()),
   });
  const { id } = useParams();
  const [devicesCompany, setDevicesCompany] = useState(null);
  const [device, setDevice] = useState([]);
  const [filial, setFilial] = useState(null);
  useEffect(() => {
    const fetchFilialDetails = async () => {
      try {
        const response = await axios.get(
          `https://api.2pay.uz/api/merchant/devices/?company=${id}`,
          {
            headers: {
              Authorization: 'Token ' + localStorage.getItem('token'),
            },
          }
        );

        console.log('Filial details:', response.data);
        setDevicesCompany(response.data);
      } catch (error) {
        console.error('Error fetching filial details:', error);
      }
    };

    fetchFilialDetails();
  }, [id]);
  useEffect(() => {
    const getFilialDetails = async () => {
      try {
        const response = await axios.get(
          `https://api.2pay.uz/api/merchant/financing/filial=${id}/?after=${range?.after}&before=${range.before}`,
          {
            headers: {
              Authorization: 'Token ' + localStorage.getItem('token'),
            },
          }
        );
        // console.log(response.data);
        setFilial(response.data);
      } catch (error) {
        console.error(error);
      }
    };
    getFilialDetails();
  }, [range, id]);
   useEffect(() => {
     devicesCompany?.map((devices) => {
       const getFilialDetails = async () => {
         try {
           const response = await axios.get(
             `https://api.2pay.uz/api/merchant/financing/device=${devices.id}/?after=${range?.after}&before=${range.before}`,
             {
               headers: {
                 Authorization: 'Token ' + localStorage.getItem('token'),
               },
             }
           );
           // console.log(response.data);
           setDevice((prev) => [...prev, response.data]);
         } catch (error) {
           console.error(error);
         }
       };
       getFilialDetails();
     });
   }, [range, devicesCompany]);
 const formattedData = device?.map((item) => {
  return {
    ID: item?.id,
    Nomi: item?.name,
    'Click ID': item?.code,
    'Sim kartasi': item?.phone_number,
    "Naqd to'lovlar miqdori": item?.cash?.amount,
    "Naqd to'lovlar soni": item?.cash?.count,
    "Onlayn to'lovlar miqdori": item?.click?.amount,
    "Onlayn to'lovlar soni": item?.click?.count,
    'Admin tolovlar miqdori': item?.manual?.amount ? item?.manual?.amount : 0,
    'Admin tolovlar soni': item?.manual?.count ? item?.manual?.count : 0,
  };})
 

  return (
    <Container>
      <Stack mb={5} direction="row" alignItems="center" justifyContent="end" spacing={2}>
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
          <ExcelDownload title="DeviceDetails" formattedData={formattedData} />
        </Stack>
      </Stack>
      <Stack direction="row" alignItems="center" justifyContent="space-between" mb={2}>
        {isdatePicker ? (
          <DateRangePickerComponent
            setIsDatePicker={setIsDatePicker}
            setRange={(a) => {
              setDevice([]);
              setRange(a);
            }}
          />
        ) : null}
      </Stack>
      <Grid container spacing={5}>
        <Grid item="true" xs={12} sm={6} md={4}>
          <AnimatedComponent>
            <FilialCard  filial={filial} />
          </AnimatedComponent>
        </Grid>

        {device.map((item) => (
          <Grid item sx={{ width: '100%', maxHeight:"265px", mb: 5 }} key={item.id} xs={12} sm={6} md={4}>
            <AnimatedComponent>
              <DeviceCard
              id={item.id}
                name={item.name}
                cash={item.cash}
                click={item.click}
                devices_count={item.devices_count}
                manual={item.manual}
                code = {item.code}
              />
            </AnimatedComponent>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default DevicesDetailView;
