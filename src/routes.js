import React from 'react';
import { Navigate, useRoutes } from 'react-router-dom';
import DashboardLayout from './layouts/dashboard';
import SimpleLayout from './layouts/simple';
import BlogPage from './pages/BlogPage';
import UserPage from './pages/UserPage';
import LoginPage from './pages/LoginPage';
import Page404 from './pages/Page404';
import ProductsPage from './pages/ProductsPage';
import Financias from './pages/Financias/Financias';
import DashboardAppPage from './pages/DashboardAppPage';

export default function Router() {
  const routes = useRoutes([
    {
      path: '/dashboard',
      element: <DashboardLayout />,
      children: [
        { path: 'app', element: <DashboardAppPage /> },
        { path: 'financias', element: <Financias /> },
        { path: 'user', element: <UserPage /> },
        { path: 'products', element: <ProductsPage /> },
        { path: 'blog', element: <BlogPage /> },
        { path: '', element: <Navigate to="/dashboard/app" replace /> },
      ],
    },
    {
      path: 'login',
      element: <LoginPage />,
    },
    {
      path: '/',
      element: <SimpleLayout />,
      children: [
        { path: '404', element: <Page404 /> },
        { path: '', element: <Navigate to="/dashboard/app" replace /> },
        { path: '*', element: <Navigate to="/404" replace /> },
      ],
    },
    {
      path: '*',
      element: <Navigate to="/404" replace />,
    },
  ]);

  return routes;
}
