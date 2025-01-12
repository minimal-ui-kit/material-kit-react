import 'src/global.css';

import { Router } from 'src/routes/sections';

import { useScrollToTop } from 'src/hooks/use-scroll-to-top';

import { ThemeProvider } from 'src/theme/theme-provider';

import { LoadingScreen } from './components/loading-screen/loading-screen';

export default function App() {
  useScrollToTop();
  return (
    <ThemeProvider>
      <Router />
      <LoadingScreen />
    </ThemeProvider>
  );
}
