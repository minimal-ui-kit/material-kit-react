// import { DataGrid } from '@mui/x-data-grid';
import { Helmet } from 'react-helmet-async';
import { faker } from '@faker-js/faker';
// @mui
import Paper from '@mui/material/Paper';
import { useTheme } from '@mui/material/styles';
import { Grid, Container, Typography } from '@mui/material';
import Button from '@mui/material/Button';
// sections
import {
  AppNewsUpdate,
  AppWebsiteVisits,
  AppWidgetSummary,
  HiscoreTable,
} from '../sections/@dashboard/app';

// ----------------------------------------------------------------------


export default function DashboardAppPage() {
  
  const theme = useTheme();

  return (
    <>
      <Helmet>
        <title> Dashboard | Minimal UI </title>
      </Helmet>

      <Container maxWidth="xxl">

        <Grid container spacing={2}>
          <Grid item xs={2} md={2} lg={2}><></></Grid>
          <AppWidgetSummary height={3} width={5} color="redblack" title="Welcome back Hyper!" />
          <Button variant="contained" size="large" align="center">Play</Button>
        </Grid>
      </Container>

      <Container maxWidth="xl">

        <Grid container spacing={5}>

          <Grid item xs={12} md={6} lg={7}>
            <HiscoreTable
              height={3} width={5} color="redblack" title="Welcome back Hyper!"
            />
          </Grid>

          <Grid item xs={0} md={0} lg={1}>
            <></>
          </Grid>

          <Grid item xs={12} md={5} lg={4}>
            <AppWebsiteVisits
              color="redblack"
              title="Recent scores"
              subheader="(+43%) than last year"
              chartLabels={[
                '01/01/2023',
                '02/01/2023',
                '03/01/2023',
                '04/01/2023',
                '05/01/2023',
                '06/01/2023',
                '07/01/2023',
                '08/01/2023',
                '09/01/2023',
                '10/01/2023',
                '11/01/2023',
              ]}
              chartData={[
                {
                  name: 'English',
                  type: 'line',
                  fill: 'solid',
                  data: [23, 11, 22, 27, 13, 22, 37, 21, 44, 22, 30],
                },
                {
                  name: 'German',
                  type: 'line',
                  fill: 'solid',
                  data: [44, 55, 41, 67, 22, 43, 21, 41, 56, 27, 43],
                },
                {
                  name: 'Slang',
                  type: 'line',
                  fill: 'solid',
                  data: [30, 25, 36, 30, 45, 35, 64, 52, 59, 36, 39],
                },
              ]}
            />
          </Grid>


          <Grid item xs={12} md={12} lg={12}>
            <AppNewsUpdate
              height={0.001} 
              color="redblack"
              title="New Lists!"
              list={[...Array(1)].map((_, index) => ({
                id: faker.datatype.uuid(),
                title: "English words Second grade",
                description: "Chapter 2",
                image: `/assets/images/covers/cover_${index + 1}.jpg`,
                postedAt: faker.date.recent(),
              }))}
            />
          </Grid>
        </Grid>
      </Container>
    </>
  );
}
