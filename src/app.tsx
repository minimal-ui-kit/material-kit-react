import 'src/global.css';

import { Router } from 'src/routes/sections';

import { useScrollToTop } from 'src/hooks/use-scroll-to-top';

import { ThemeProvider } from 'src/theme/theme-provider';

import { AlertUtil } from './utils';
import AppAlert from './components/shared/alert';

// ----------------------------------------------------------------------

export default function App() {
  useScrollToTop();

  const setAlert = (ref: any) => {
    AlertUtil.setRef(ref);
  };

  return (
    <ThemeProvider>
      <Router />
      <AppAlert ref={(ref) => setAlert(ref)} />
    </ThemeProvider>
  );
}
