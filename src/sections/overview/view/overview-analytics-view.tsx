import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Unstable_Grid2';

import { DashboardContent } from 'src/layouts/dashboard';

import { Box, LinearProgress, linearProgressClasses } from '@mui/material';
import { useCallback, useEffect, useState } from 'react';
import useAdmin from 'src/hooks/useAdmin';
import useUser from 'src/hooks/useUser';
import { useRouter } from 'src/routes/hooks';
import { ContributionProps } from 'src/sections/contributions/contributions-table-row';
import { ContributionsView } from 'src/sections/contributions/view';
import ContributionService from 'src/services/cont';
import { Contribution, ContributionStatus } from 'src/services/cont/contribute.dto';
import StatsService from 'src/services/stats';
import { Stats, UserStats } from 'src/services/stats/stats.dto';
import { varAlpha } from 'src/theme/styles';
import { Cache, CacheKeys, errCb } from 'src/utils';
import { AnalyticsWidgetSummary } from '../analytics-widget-summary';

// ----------------------------------------------------------------------

export function OverviewAnalyticsView() {
  const { user } = useUser();
  const isAdminMode = Cache.get(CacheKeys.AdminMode);
  const { refresh } = useRouter();

  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<{ stats?: Stats | UserStats; cons?: ContributionProps[] }>();

  const getStatus = (status: ContributionStatus): ContributionProps['status'] => {
    if (status === ContributionStatus.Failed) return 'failed';
    if (status === ContributionStatus.Pending) return 'pending';
    return 'success';
  };

  const getContributions = useCallback(
    (result: Contribution[]): ContributionProps[] =>
      result.map((item) => ({
        amount: item.amount,
        id: item.id,
        months: item.months,
        sender: item.donor,
        status: getStatus(item.status),
        timestamp: (item.completedAt || item.createdAt).toDate(),
        code: item?.trxCode,
      })),
    []
  );

  const getStats = useCallback(async () => {
    const stats = isAdminMode ? await StatsService.get() : await StatsService.getByUser();
    setData((val) => (val ? { ...val, stats } : { stats }));
  }, [isAdminMode]);

  const onLatestContribution = useCallback(
    (value: Contribution[]) => {
      const cons = getContributions(value);
      setData((val) => (val ? { ...val, cons } : { cons }));
      getStats();
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [getContributions, getStats]
  );

  const init = useCallback(async () => {
    if (!user?.id) return;
    try {
      ContributionService.listenLatest(onLatestContribution, isAdminMode ? undefined : user.id);
      await getStats();
    } catch (error) {
      errCb(error.message);
    } finally {
      setLoading(false);
    }
  }, [user?.id, onLatestContribution, isAdminMode, getStats]);

  useEffect(() => {
    init();
  }, [init]);

  if (loading) {
    return (
      <Box display="flex" alignItems="center" justifyContent="center" flex="1 1 auto">
        <LinearProgress
          sx={{
            width: 1,
            maxWidth: 320,
            bgcolor: (theme) => varAlpha(theme.vars.palette.text.primaryChannel, 0.16),
            [`& .${linearProgressClasses.bar}`]: { bgcolor: 'text.primary' },
          }}
        />
      </Box>
    );
  }

  const mdQuery = isAdminMode ? 3 : 4;

  return (
    <DashboardContent maxWidth="xl">
      <Typography variant="h4" sx={{ mb: { xs: 3, md: 5 } }}>
        Hi, {user?.fname} 👋
      </Typography>

      <Grid container spacing={3}>
        <Grid xs={12} md={mdQuery}>
          <AnalyticsWidgetSummary
            title="No. of contributions"
            total={data?.stats?.contributionCount || 0}
            icon={<img alt="icon" src="/assets/icons/glass/ic-donate.svg" />}
            chart={{
              categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug'],
              series: [],
            }}
          />
        </Grid>

        <Grid xs={12} md={mdQuery}>
          <AnalyticsWidgetSummary
            title={isAdminMode ? 'No. of Partners' : 'Pledge Amount (GHS)'}
            total={
              (isAdminMode
                ? (data?.stats as Stats)?.partnersCount
                : (data?.stats as UserStats).pledge) || 0
            }
            color="secondary"
            icon={<img alt="icon" src="/assets/icons/glass/ic-glass-users.svg" />}
            chart={{
              categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug'],
              series: [],
            }}
          />
        </Grid>

        {isAdminMode ? (
          <Grid xs={12} md={mdQuery}>
            <AnalyticsWidgetSummary
              title="Expected Monthly contributions (GHS)"
              total={`${(data?.stats as Stats)?.expectedMonthly || 0}`}
              color="info"
              icon={<img alt="icon" src="/assets/icons/glass/ic-wallet.svg" />}
              chart={{
                categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug'],
                series: [10, 6, 9],
              }}
            />
          </Grid>
        ) : null}

        <Grid xs={12} md={mdQuery}>
          <AnalyticsWidgetSummary
            title="Total contributions (GHS)"
            total={`${(isAdminMode ? (data?.stats as Stats)?.totalAmount : (data?.stats as UserStats).totalContribution) || 0}`}
            color="warning"
            icon={<img alt="icon" src="/assets/icons/glass/ic-wallet.svg" />}
            chart={{
              categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug'],
              series: [10, 6, 9],
            }}
          />
        </Grid>

        {/* <Grid xs={12} sm={6} md={3}>
          <AnalyticsWidgetSummary
            title="Messages"
            // percent={3.6}
            total={234}
            color="error"
            icon={<img alt="icon" src="/assets/icons/glass/ic-glass-message.svg" />}
            chart={{
              categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug'],
              series: [],
            }}
          />
        </Grid> */}
        {/* <Grid xs={12} md={6} lg={4}>
          <AnalyticsCurrentVisits
            title="Current visits"
            chart={{
              series: [
                { label: 'America', value: 3500 },
                { label: 'Asia', value: 2500 },
                { label: 'Europe', value: 1500 },
                { label: 'Africa', value: 500 },
              ],
            }}
          />
        </Grid> */}
        {/* <Grid xs={12} md={6} lg={8}>
          <AnalyticsWebsiteVisits
            title="Website visits"
            subheader="(+43%) than last year"
            chart={{
              categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep'],
              series: [
                { name: 'Team A', data: [43, 33, 22, 37, 67, 68, 37, 24, 55] },
                { name: 'Team B', data: [51, 70, 47, 67, 40, 37, 24, 70, 24] },
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
        </Grid> */}
        {/* <Grid xs={12} md={6} lg={4}>
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
        </Grid> */}
        <Grid xs={12}>
          <ContributionsView
            title="Recent Contributions"
            hideBtn
            noToolbar
            ignoreDashContent
            noMultiSelect
            noPagination
            viewMore
            data={data?.cons}
          />
        </Grid>
        {/* <Grid xs={12} md={6} lg={4}>
          <AnalyticsOrderTimeline title="Order timeline" list={_timeline} />
        </Grid> */}
        {/* <Grid xs={12} md={6} lg={4}>
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
        </Grid> */}
      </Grid>
    </DashboardContent>
  );
}
