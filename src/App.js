import { useRoutes } from 'react-router-dom';
// routes
import Router from './routes';
// theme
import ThemeProvider from './theme';
// components
import ScrollToTop from './components/scroll-to-top';
import { StyledChart } from './components/chart';

// ----------------------------------------------------------------------

export default function App() {
  const currentUser = JSON.stringify(sessionStorage.getItem('current_user'));
  const router = Router(currentUser);
  const someRoutes = useRoutes(router);
  // eslint-disable-next-line no-debugger
  debugger;
  return (
    <ThemeProvider>
      <ScrollToTop />
      <StyledChart />
      {someRoutes}
    </ThemeProvider>
  );
}
