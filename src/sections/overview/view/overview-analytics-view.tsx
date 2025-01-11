import Grid from '@mui/material/Unstable_Grid2';
import Typography from '@mui/material/Typography';
import { useTranslation } from 'react-i18next';

import { _tasks, _posts, _timeline } from 'src/_mock';
import { DashboardContent } from 'src/layouts/dashboard';

import { AnalyticsNews } from '../analytics-news';
import { AnalyticsTasks } from '../analytics-tasks';
import { AnalyticsCurrentVisits } from '../analytics-current-visits';
import { AnalyticsOrderTimeline } from '../analytics-order-timeline';
import { AnalyticsWebsiteVisits } from '../analytics-website-visits';
import { AnalyticsWidgetSummary } from '../analytics-widget-summary';
import { AnalyticsTrafficBySite } from '../analytics-traffic-by-site';
import { AnalyticsCurrentSubject } from '../analytics-current-subject';
import { AnalyticsConversionRates } from '../analytics-conversion-rates';

// ----------------------------------------------------------------------

export function OverviewAnalyticsView() {
  const { t } = useTranslation(['overview', 'common']);

  return (
    <DashboardContent maxWidth="xl">
      <Typography variant="h4" sx={{ mb: { xs: 3, md: 5 } }}>
        {t('overview:welcome')}
      </Typography>

      <Grid container spacing={3}>
        <Grid xs={12} sm={6} md={3}>
          <AnalyticsWidgetSummary
            title={t('overview:widgets.weeklySales')}
            percent={2.6}
            total={714000}
            icon={<img alt="icon" src="/assets/icons/glass/ic-glass-bag.svg" />}
            chart={{
              categories: [
                t('common:months.short.jan'),
                t('common:months.short.feb'),
                t('common:months.short.mar'),
                t('common:months.short.apr'),
                t('common:months.short.may'),
                t('common:months.short.jun'),
                t('common:months.short.jul'),
                t('common:months.short.aug')
              ],
              series: [22, 8, 35, 50, 82, 84, 77, 12],
            }}
          />
        </Grid>

        <Grid xs={12} sm={6} md={3}>
          <AnalyticsWidgetSummary
            title={t('overview:widgets.newUsers')}
            percent={-0.1}
            total={1352831}
            color="secondary"
            icon={<img alt="icon" src="/assets/icons/glass/ic-glass-users.svg" />}
            chart={{
              categories: [
                t('common:months.short.jan'),
                t('common:months.short.feb'),
                t('common:months.short.mar'),
                t('common:months.short.apr'),
                t('common:months.short.may'),
                t('common:months.short.jun'),
                t('common:months.short.jul'),
                t('common:months.short.aug')
              ],
              series: [56, 47, 40, 62, 73, 30, 23, 54],
            }}
          />
        </Grid>

        <Grid xs={12} sm={6} md={3}>
          <AnalyticsWidgetSummary
            title={t('overview:widgets.purchaseOrders')}
            percent={2.8}
            total={1723315}
            color="warning"
            icon={<img alt="icon" src="/assets/icons/glass/ic-glass-buy.svg" />}
            chart={{
              categories: [
                t('common:months.short.jan'),
                t('common:months.short.feb'),
                t('common:months.short.mar'),
                t('common:months.short.apr'),
                t('common:months.short.may'),
                t('common:months.short.jun'),
                t('common:months.short.jul'),
                t('common:months.short.aug')
              ],
              series: [40, 70, 50, 28, 70, 75, 7, 64],
            }}
          />
        </Grid>

        <Grid xs={12} sm={6} md={3}>
          <AnalyticsWidgetSummary
            title={t('overview:widgets.messages')}
            percent={3.6}
            total={234}
            color="error"
            icon={<img alt="icon" src="/assets/icons/glass/ic-glass-message.svg" />}
            chart={{
              categories: [
                t('common:months.short.jan'),
                t('common:months.short.feb'),
                t('common:months.short.mar'),
                t('common:months.short.apr'),
                t('common:months.short.may'),
                t('common:months.short.jun'),
                t('common:months.short.jul'),
                t('common:months.short.aug')
              ],
              series: [56, 30, 23, 54, 47, 40, 62, 73],
            }}
          />
        </Grid>

        <Grid xs={12} md={6} lg={4}>
          <AnalyticsCurrentVisits
            title={t('overview:charts.currentVisits.title')}
            chart={{
              series: [
                { label: t('overview:charts.currentVisits.regions.america'), value: 3500 },
                { label: t('overview:charts.currentVisits.regions.asia'), value: 2500 },
                { label: t('overview:charts.currentVisits.regions.europe'), value: 1500 },
                { label: t('overview:charts.currentVisits.regions.africa'), value: 500 },
              ],
            }}
          />
        </Grid>

        <Grid xs={12} md={6} lg={8}>
          <AnalyticsWebsiteVisits
            title={t('overview:charts.websiteVisits.title')}
            subheader={t('overview:charts.websiteVisits.subheader')}
            chart={{
              categories: [
                t('common:months.short.jan'),
                t('common:months.short.feb'),
                t('common:months.short.mar'),
                t('common:months.short.apr'),
                t('common:months.short.may'),
                t('common:months.short.jun'),
                t('common:months.short.jul'),
                t('common:months.short.aug'),
                t('common:months.short.sep')
              ],
              series: [
                { name: t('overview:charts.websiteVisits.teams.teamA'), data: [43, 33, 22, 37, 67, 68, 37, 24, 55] },
                { name: t('overview:charts.websiteVisits.teams.teamB'), data: [51, 70, 47, 67, 40, 37, 24, 70, 24] },
              ],
            }}
          />
        </Grid>

        <Grid xs={12} md={6} lg={8}>
          <AnalyticsConversionRates
            title="Conversion rates"
            subheader="(+43%) than last year"
            chart={{
              categories: ['Italy', 'Japan', 'China', 'Canada', 'France'],
              series: [
                { name: '2022', data: [44, 55, 41, 64, 22] },
                { name: '2023', data: [53, 32, 33, 52, 13] },
              ],
            }}
          />
        </Grid>

        <Grid xs={12} md={6} lg={4}>
          <AnalyticsCurrentSubject
            title="Current subject"
            chart={{
              categories: ['English', 'History', 'Physics', 'Geography', 'Chinese', 'Math'],
              series: [
                { name: 'Series 1', data: [80, 50, 30, 40, 100, 20] },
                { name: 'Series 2', data: [20, 30, 40, 80, 20, 80] },
                { name: 'Series 3', data: [44, 76, 78, 13, 43, 10] },
              ],
            }}
          />
        </Grid>

        <Grid xs={12} md={6} lg={8}>
          <AnalyticsNews title="News" list={_posts.slice(0, 5)} />
        </Grid>

        <Grid xs={12} md={6} lg={4}>
          <AnalyticsOrderTimeline title="Order timeline" list={_timeline} />
        </Grid>

        <Grid xs={12} md={6} lg={4}>
          <AnalyticsTrafficBySite
            title="Traffic by site"
            list={[
              { value: 'facebook', label: 'Facebook', total: 323234 },
              { value: 'google', label: 'Google', total: 341212 },
              { value: 'linkedin', label: 'Linkedin', total: 411213 },
              { value: 'twitter', label: 'Twitter', total: 443232 },
            ]}
          />
        </Grid>

        <Grid xs={12} md={6} lg={8}>
          <AnalyticsTasks title="Tasks" list={_tasks} />
        </Grid>
      </Grid>
    </DashboardContent>
  );
}
