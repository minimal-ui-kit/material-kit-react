// import { faker } from '@faker-js/faker';
import { useQuery } from '@tanstack/react-query';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Unstable_Grid2';
import Typography from '@mui/material/Typography';
import {  Stack } from '@mui/material';
import AppWidgetSummary from '../app-widget-summary';
import AppTransactionsTable from '../app-transactions-table';

import PaymentIcon from '@mui/icons-material/Payment';
import CreditScoreIcon from '@mui/icons-material/CreditScore';
import PaymentsIcon from '@mui/icons-material/Payments';
import axiosInstance from 'src/routes/axios-config';
import LoadingSpinner from 'src/components/loading';
import { protsent } from 'src/utils/protsent';
// ----------------------------------------------------------------------

export default function AppView() {
  // const [data, setData] = useState([]);

  const {data, error, isLoading} = useQuery({
    queryKey: ["dashboard"],
    queryFn: () => axiosInstance.get('/merchant/dashboard/').then((res) => res.data),
    onError: (error) => {
      console.log(error);
    }
  })
  if(isLoading)return <LoadingSpinner/>
  

 
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