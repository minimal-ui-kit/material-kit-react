import { Helmet } from 'react-helmet-async';

import { CONFIG } from 'src/config-global';

import { OverviewAnalyticsView } from 'src/sections/overview/view';

// ----------------------------------------------------------------------

export default function Page() {
  return (
    <>
      <Helmet>
        <title> {`Dashboard - ${CONFIG.appName}`}</title>
        <meta name="description" content="The PABGM partnership platform for all." />
        <meta name="keywords" content="pabgm,partnership,GOCEM,CEM,Christ Exploit Ministry" />
      </Helmet>

      <OverviewAnalyticsView />
    </>
  );
}
