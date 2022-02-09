import { Navigate, useRoutes } from 'react-router-dom';
// layouts
import DashboardLayout from './layouts/dashboard';
import LogoOnlyLayout from './layouts/LogoOnlyLayout';
//
import DashboardApp from './pages/DashboardApp';
import Drawing from './pages/Drawing';
import Office from './pages/Office';
import Balcony from './pages/Balcony';
import Bedroom from './pages/Balcony';
import Kids from './pages/Balcony';
import Kitchen from './pages/Balcony';
import Living from './pages/Living';
import NotFound from './pages/Page404';

// ----------------------------------------------------------------------

export default function Router() {
  return useRoutes([
    {
      path: '/dashboard',
      element: <DashboardLayout />,
      children: [
        { element: <Navigate to="/dashboard/app" replace /> },
        { path: 'app', element: <DashboardApp /> },
        { path: 'drawing', element: <Drawing /> },
        { path: 'office', element: <Office /> },
        { path: 'balcony', element: <Balcony /> },
        { path: 'bedroom', element: <Bedroom /> },
        { path: 'kids', element: <Kids /> },
        { path: 'living', element: <Living /> },
        { path: 'kitchen', element: <Kitchen /> }
      ]
    },
    {
      path: '/',
      element: <LogoOnlyLayout />,
      children: [
        { path: '404', element: <NotFound /> },
        { path: '/', element: <Navigate to="/dashboard" /> },
        { path: '*', element: <Navigate to="/404" /> }
      ]
    },
    { path: '*', element: <Navigate to="/404" replace /> }
  ]);
}
