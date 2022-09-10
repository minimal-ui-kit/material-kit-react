import React from 'react';
// import ReactDOM from 'react-dom';
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';
// import { faker } from '@faker-js/faker';
// @mui
// import { useTheme } from '@mui/material/styles';
import { Grid, Container, Typography } from '@mui/material';
// components
import Page from '../components/Page';
// import Iconify from '../components/Iconify';
// sections
import {
  // AppTasks,
  // AppNewsUpdate,
  // AppOrderTimeline,
  // AppCurrentVisits,
  // AppWebsiteVisits,
  AppTrafficBySite,
  // AppWidgetSummary,
  // AppCurrentSubject,
  // AppConversionRates,
} from '../sections/@dashboard/app';

// ----------------------------------------------------------------------

export default function DashboardApp() {
  // const theme = useTheme();

  return (
    <Page title="Dashboard">
      <Container maxWidth="xl">
        <Typography variant="h4" sx={{ mb: 5 }}>
          Học pha chế
        </Typography>

        <Grid container spacing={3}>
          
          <Grid item xs={12 }  md={6} lg={8} >
            <Carousel showThumbs={false} infiniteLoop>
                <div>
                    <img alt="1" src="https://haigiangnetwork.com/assets/storage/images/category_OZY2UL5JP0GB.png" />
                  
                </div>
                <div>
                    <img alt="2" src="https://haigiangnetwork.com/assets/storage/images/category_OZY2UL5JP0GB.png" />
                   
                </div>
                <div>
                    <img alt="3" src="https://haigiangnetwork.com/assets/storage/images/category_OZY2UL5JP0GB.png" />
                    
                </div>
            </Carousel>
          </Grid>

          

          {/* <Grid item xs={12} md={6} lg={4}>
            <AppCurrentVisits
              title="Current Visits"
              chartData={[
                { label: 'America', value: 4344 },
                { label: 'Asia', value: 5435 },
                { label: 'Europe', value: 1443 },
                { label: 'Africa', value: 4443 },
              ]}
              chartColors={[
                theme.palette.primary.main,
                theme.palette.chart.blue[0],
                theme.palette.chart.violet[0],
                theme.palette.chart.yellow[0],
              ]}
            />
          </Grid> */}

          {/* <Grid item xs={12} md={6} lg={8}>
            <AppConversionRates
              title="Conversion Rates"
              subheader="(+43%) than last year"
              chartData={[
                { label: 'Italy', value: 400 },
                { label: 'Japan', value: 430 },
                { label: 'China', value: 448 },
                { label: 'Canada', value: 470 },
                { label: 'France', value: 540 },
                { label: 'Germany', value: 580 },
                { label: 'South Korea', value: 690 },
                { label: 'Netherlands', value: 1100 },
                { label: 'United States', value: 1200 },
                { label: 'United Kingdom', value: 1380 },
              ]}
            />
          </Grid> */}

          {/* <Grid item xs={12} md={6} lg={4}>
            <AppCurrentSubject
              title="Current Subject"
              chartLabels={['English', 'History', 'Physics', 'Geography', 'Chinese', 'Math']}
              chartData={[
                { name: 'Series 1', data: [80, 50, 30, 40, 100, 20] },
                { name: 'Series 2', data: [20, 30, 40, 80, 20, 80] },
                { name: 'Series 3', data: [44, 76, 78, 13, 43, 10] },
              ]}
              chartColors={[...Array(6)].map(() => theme.palette.text.secondary)}
            />
          </Grid> */}

          {/* <Grid item xs={12} md={6} lg={8}>
            <AppNewsUpdate
              title="News Update"
              list={[...Array(5)].map((_, index) => ({
                id: faker.datatype.uuid(),
                title: faker.name.jobTitle(),
                description: faker.name.jobTitle(),
                image: `/static/mock-images/covers/cover_${index + 1}.jpg`,
                postedAt: faker.date.recent(),
              }))}
            />
          </Grid> */}

          {/* <Grid item xs={12} md={6} lg={4}>
            <AppOrderTimeline
              title="Order Timeline"
              list={[...Array(5)].map((_, index) => ({
                id: faker.datatype.uuid(),
                title: [
                  '1983, orders, $4220',
                  '12 Invoices have been paid',
                  'Order #37745 from September',
                  'New order placed #XF-2356',
                  'New order placed #XF-2346',
                ][index],
                type: `order${index + 1}`,
                time: faker.date.past(),
              }))}
            />
          </Grid> */}

          <Grid item xs={12} md={6} lg={4}>
            <AppTrafficBySite
              title="Top bài học"
              list={[
                {
                  name: 'Pha chế cơ bản 1',
                  value: 99000,
                  icon: <img alt="" src='https://haigiangnetwork.com/assets/storage/images/category_Q96MXEIUL53H.png'/>
                  // icon: <Iconify icon={'eva:facebook-fill'} color="#1877F2" width={32} height={32} />,
                },
                {
                  name: 'Pha chế cơ bản 2',
                  value: 499000,
                  icon: <img alt="" src='https://haigiangnetwork.com/assets/storage/images/category_PZ5CDXVTMY96.png'/>
                  // icon: <Iconify icon={'eva:google-fill'} color="#DF3E30" width={32} height={32} />,
                },
                {
                  name: 'Pha chế cơ bản 3',
                  value: 49000,
                  icon: <img alt="" src='https://haigiangnetwork.com/assets/storage/images/category_Q96MXEIUL53H.png'/>
                  // icon: <Iconify icon={'eva:linkedin-fill'} color="#006097" width={32} height={32} />,
                },
                {
                  name: 'Pha chế cơ bản 4',
                  value: 1000000,
                  icon: <img alt="" src='https://haigiangnetwork.com/assets/storage/images/category_PZ5CDXVTMY96.png'/>
                  // icon: <Iconify icon={'eva:twitter-fill'} color="#1C9CEA" width={32} height={32} />,
                },
              ]}
            />
          </Grid>

          {/* <Grid item xs={12} md={6} lg={8}>
            <AppTasks
              title="Tasks"
              list={[
                { id: '1', label: 'Create FireStone Logo' },
                { id: '2', label: 'Add SCSS and JS files if required' },
                { id: '3', label: 'Stakeholder Meeting' },
                { id: '4', label: 'Scoping & Estimations' },
                { id: '5', label: 'Sprint Showcase' },
              ]}
            />
          </Grid> */}
        </Grid>
      </Container>
    </Page>
  );
}
