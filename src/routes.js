import { Navigate } from 'react-router-dom';
// layouts
import DashboardLayout from './layouts/dashboard';
import SimpleLayout from './layouts/simple';
//
import BlogPage from './pages/BlogPage';
import UserPage from './pages/UserPage';
import LoginPage from './pages/LoginPage';
import Page404 from './pages/Page404';
import ProductsPage from './pages/ProductsPage';
import DashboardAppPage from './pages/DashboardAppPage';

// ----------------------------------------------------------------------

const routes = [
  {
    path: '/dashboard',
    element: <DashboardLayout />,
    children: [
      { element: <Navigate to="/dashboard/user" />, index: true },
      { path: 'app', element: <DashboardAppPage /> },
      { path: 'user', element: <UserPage /> },
      { path: 'products', element: <ProductsPage /> },
      { path: 'blog', element: <BlogPage /> },
    ],
  },
  {
    path: 'login',
    element: <LoginPage />,
  },
  {
    element: <SimpleLayout />,
    children: [
      { element: <Navigate to="login" />, index: true },
      { path: '404', element: <Page404 /> },
      { path: '*', element: <Navigate to="/404" /> },
    ],
  },
  {
    path: '*',
    element: <Navigate to="/404" replace />,
  },
];

const unAuthorisedRoutes = [
  {
    path: 'login',
    element: <LoginPage />,
  },
  {
    element: <SimpleLayout />,
    children: [
      { element: <Navigate to="login" />, index: true },
      { path: '404', element: <Page404 /> },
      { path: '*', element: <Navigate to="/404" /> },
    ],
  },
];

export default function Router(user) {
  // eslint-disable-next-line no-debugger
  debugger;
  if (user === 'null') {
    return unAuthorisedRoutes;
  }
  return routes;
}
