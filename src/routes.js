/* eslint-disable */ 
import { Navigate, useRoutes } from 'react-router-dom';
// layouts
import DashboardLayout from './layouts/dashboard';
import LogoOnlyLayout from './layouts/LogoOnlyLayout';
//
import Login from './pages/Login';
import Register from './pages/Register';
import DashboardApp from './pages/DashboardApp';
import Products from './pages/Products';
import User from './pages/User';
import Inventory from './pages/Inventory';
import Settings from './pages/Settings';
import Item from './pages/Item';

// ----------------------------------------------------------------------

export default function Router() {
  return useRoutes([
    {
      path: '/dashboard',
      element: <DashboardLayout />,
      children: [
        { element: <Navigate to="/dashboard/app" replace /> },
        { path: 'app', element: <DashboardApp /> },
        { path: 'user', element: <User /> },
        { path: 'inventory', element: <Inventory /> },
        { path: 'products', element: <Products /> },
        { path: 'products/item', element: <Item /> },
        { path: 'settings', element: <Settings /> },
      ]
    },
    {
      path: '/',
      element: <LogoOnlyLayout />,
      children: [
        { path: 'login', element: <Login /> },
        { path: 'register', element: <Register /> },
        { path: '/', element: <Navigate to="/dashboard" /> }
        // { path: '*', element: <Navigate to="/404" /> }
      ]
    }
  ]);
}
