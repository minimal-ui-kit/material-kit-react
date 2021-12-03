import { useState, useMemo } from 'react';
// RTL plugins
import rtlPlugin from 'stylis-plugin-rtl';
import { CacheProvider } from '@emotion/react';
import createCache from '@emotion/cache';
// theme
import { ThemeProvider, StyledEngineProvider } from '@mui/material/styles';

import CssBaseline from '@mui/material/CssBaseline';
// import { theme } from './theme';
import { rtlTheme } from './theme/rtl-theme';

import GlobalStyles from './theme/globalStyles';
// components
import ScrollToTop from './components/ScrollToTop';
import { BaseOptionChartStyle } from './components/charts/BaseOptionChart';

// routes
import Router from './routes';
// ----------------------------------------------------------------------

export default function App({ children }) {
  const [rtlCache, setRtlCache] = useState(null);

  // Cache for the rtl
  useMemo(() => {
    const cacheRtl = createCache({
      key: 'rtl',
      stylisPlugins: [rtlPlugin]
    });

    setRtlCache(cacheRtl);
  }, []);
  return (
    <CacheProvider value={rtlCache}>
      {/* <StyledEngineProvider injectFirst> */}
      <ThemeProvider theme={rtlTheme}>
        <CssBaseline />
        {children}
        <ScrollToTop />
        <GlobalStyles />
        <BaseOptionChartStyle />
        <Router />
      </ThemeProvider>
      {/* </StyledEngineProvider> */}
    </CacheProvider>
  );
}
