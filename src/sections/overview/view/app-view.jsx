// import { faker } from '@faker-js/faker';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Unstable_Grid2';
import Typography from '@mui/material/Typography';
import {  Stack } from '@mui/material';
import AppWidgetSummary from '../app-widget-summary';
import AppTransactionsTable from '../app-transactions-table';
import { useEffect, useState } from 'react';
import axios from 'axios';
import PaymentIcon from '@mui/icons-material/Payment';
import CreditScoreIcon from '@mui/icons-material/CreditScore';
import PaymentsIcon from '@mui/icons-material/Payments';
// ----------------------------------------------------------------------

export default function AppView() {
  const [data, setData] = useState([]);

  useEffect(() => {
    const getData = async () => {
      try {
        const response = await axios.get('https://api.2pay.uz/api/merchant/dashboard/', {
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
  const protsent = (cash_summa, click_summa) => {
    const total = cash_summa + click_summa;
    let cash_protsent ,
      click_protsent ;
    if (total !== 0) {
      cash_protsent = ((cash_summa / total) * 100).toFixed(2);
      click_protsent =((click_summa / total) * 100).toFixed(2);
      return { cash_protsent, click_protsent };
    }else{
      return { cash_protsent: 0, click_protsent: 0 };
    }
  };

 
  return (
    <Container maxWidth="xl" sx={{ mt: 5 }}>
      
      <Stack mb={5}>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6} md={4}>
            <AppWidgetSummary
              title="Bugungi to'lovlar"
              cash_summa={data?.summary_statistics?.cash?.today_summa}
              click_summa={data?.summary_statistics?.click?.today_summa}
              cash_count={data?.summary_statistics?.cash?.today_count}
              click_count={data?.summary_statistics?.click?.today_count}
              protsent={protsent(
                data?.summary_statistics?.cash?.today_summa,
                data?.summary_statistics?.click?.today_summa
              )}
              icon={<PaymentIcon fontSize="large" />}
              color="rgb(79, 70, 229)"
            />
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <AppWidgetSummary
              title="Bu hafta to'lovlari"
              cash_summa={data?.summary_statistics?.cash?.this_week_summa}
              click_summa={data?.summary_statistics?.click?.this_week_summa}
              cash_count={data?.summary_statistics?.cash?.this_week_count}
              click_count={data?.summary_statistics?.click?.this_week_count}
              protsent={protsent(
                data?.summary_statistics?.cash?.this_week_summa,
                data?.summary_statistics?.click?.this_week_summa
              )}
              icon={<PaymentsIcon fontSize="large" />}
              color="rgb(37, 99, 235)"
            />
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <AppWidgetSummary
              title="Bu oy to'lovlari"
              cash_summa={data?.summary_statistics?.cash?.this_month_summa}
              click_summa={data?.summary_statistics?.click?.this_month_summa}
              cash_count={data?.summary_statistics?.cash?.this_month_count}
              click_count={data?.summary_statistics?.click?.this_month_count}
              protsent={protsent(
                data?.summary_statistics?.cash?.this_month_summa,
                data?.summary_statistics?.click?.this_month_summa
              )}
              icon={<CreditScoreIcon fontSize="large" />}
              color="rgb(219, 39, 119)"
            />
          </Grid>
        </Grid>
      </Stack>
      <Stack direction={{ xs: 'column', sm: 'row'}} alignItems="start" justifyContent="space-between" spacing={3}>
        <AppTransactionsTable
          data={data?.last_transactions?.click}
          title="Oxirgi online to'lov operatsiyalari"
        />
        <AppTransactionsTable
          data={data?.last_transactions?.cash}
          title="Oxirgi naqd to'lov operatsiyalari"
        />
      </Stack>
    </Container>
  );
}
