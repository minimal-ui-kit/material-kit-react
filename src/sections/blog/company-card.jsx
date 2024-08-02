import {
   Box,
  Typography,
  Card,
  CardContent,
  
} from '@mui/material';
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const CompanyCard = ({range}) => {
   const {after, before} = range
   console.log(after, before)
  const [data, setData] = useState([]);
  const [companyDetail, setCompanyDetail] = useState();
  useEffect(() => {
    const getData = async () => {
      try {
        const response = await axios.get('https://api.2pay.uz/api/users/request-user/', {
          headers: {
            Authorization: 'Token ' + localStorage.getItem('token'),
          },
        });
        console.log(response.data);
        setData(response.data);
      } catch (error) {
        console.error(error);
      }
    };
    getData();
  }, []);

  useEffect(() => {
    const getCompanyDetail = async () => {
      try {
        const res = await axios.get(
          `https://api.2pay.uz/api/merchant/financing/company-detail/?after=${after}&before=${before}`,
          {
            headers: {
              Authorization: 'Token ' + localStorage.getItem('token'),
            },
          }
        );
        console.log(res.data);
        setCompanyDetail(res.data);
      } catch (error) {
        console.error(error);
      }  
    };
    getCompanyDetail();
  }, [after, before]);
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
            {data?.current_company?.name}{' '}
          </Typography>
          <Typography color={'text.primary'} variant="subtitle1" component="div">
            Qurilmalar:{' '}
            <Box component={'span'} sx={{ fontWeight: 'fontWeightBold', color: 'text.secondary' }}>
              {' '}
              {data?.current_company?.devices_count} ta
            </Box>
          </Typography>
          <Typography color={'text.primary'} variant="subtitle1" component="div">
            Filialllar:{' '}
            <Box component={'span'} sx={{ fontWeight: 'fontWeightBold', color: 'text.secondary' }}>
              {' '}
              {data?.current_company?.filials_count} ta
            </Box>
          </Typography>
          <Typography color={'text.primary'} variant="subtitle1" component="div">
            Naqd pul tolovlari:{' '}
            <Box component={'span'} sx={{ fontWeight: 'fontWeightBold', color: 'text.secondary' }}>
              {' '}
              {companyDetail?.cash?.amount} so'm <br /> ({companyDetail?.cash?.count} ta
              transaksiya)
            </Box>
          </Typography>
          <Typography color="text.primary" variant="subtitle1" component="div">
            Onlayn tolovlar:{' '}
            <Box component={'span'} sx={{ fontWeight: 'fontWeightBold', color: 'text.secondary' }}>
              {companyDetail?.click?.amount} so'm <br />({companyDetail?.click?.count} ta
              transaksiya)
            </Box>
          </Typography>
          <Typography variant="subtitle1">
            Admin to'lovlari:{' '}
            <Box component={'span'} sx={{ fontWeight: 'fontWeightBold', color: 'text.secondary' }}>
              {companyDetail?.manual?.amount === null ? 0 : companyDetail?.manual?.amount} so'm{' '}
              <br />({companyDetail?.manual?.count} ta transaksiya)
            </Box>
          </Typography>
        </CardContent>
      </Card>
    </Box>
  );
};

export default CompanyCard;
