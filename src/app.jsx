/* eslint-disable perfectionist/sort-imports */
import 'src/global.css';

import { useScrollToTop } from 'src/hooks/use-scroll-to-top';

import Router from 'src/routes/sections';
import ThemeProvider from 'src/theme';

// ----------------------------------------------------------------------

export default function App() {
  useScrollToTop();
  // const [token] = useState(localStorage.getItem('token'));
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
