/* eslint-disable perfectionist/sort-imports */
import 'src/global.css';

import { useScrollToTop } from 'src/hooks/use-scroll-to-top';

import Router from 'src/routes/sections';
import ThemeProvider from 'src/theme';
import { useEffect } from 'react';
import { useApi } from './redux/api-calls';

// ----------------------------------------------------------------------

export default function App() {
  useScrollToTop();
  const api = useApi();

  useEffect(() => {
    console.log('Calling this function out');
    api.fetchUser();
    // axios.defaults.headers.common.Authorization = `Bearer ${token}`;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  // const { fetchUser } = useContext(AppContext);
  // useEffect(() => {
  //   if (token) {
  //     axios.defaults.headers.common.Authorization = `Bearer ${token}`;
  //   }
  //   fetchUser();
  // }, [token, fetchUser]);
  return (
    <ThemeProvider>
      <Router />
    </ThemeProvider>
  );
}
