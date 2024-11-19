import 'src/global.css';

import { Router } from 'src/routes/sections';

import { useScrollToTop } from 'src/hooks/use-scroll-to-top';

import { ThemeProvider } from 'src/theme/theme-provider';

import AppAlert from './components/shared/alert';
import { AlertUtil } from './utils';

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
