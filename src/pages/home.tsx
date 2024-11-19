import { Fab } from '@mui/material';
import { useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { Iconify } from 'src/components/iconify';

import { CONFIG } from 'src/config-global';
import { fx } from 'src/configs';

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
