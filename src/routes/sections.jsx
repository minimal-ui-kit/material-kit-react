import { lazy, Suspense } from 'react';
import { Outlet, Navigate, useRoutes } from 'react-router-dom';

import DashboardLayout from 'src/layouts/dashboard';
import ProtectedRoute from './context/protected-route';
import { AuthProvider } from './context/auth-context';

export const IndexPage = lazy(() => import('src/pages/app'));
export const FinancingPage = lazy(() => import('src/pages/financing'));
export const ReportPage = lazy(() => import('src/pages/report'));
export const LoginPage = lazy(() => import('src/pages/login'));
export const DevicesActivityPage = lazy(() => import('src/pages/devices-activity'));
export const DevicesDetailPage = lazy(() => import('src/pages/devices-detail'));
export const Page404 = lazy(() => import('src/pages/page-not-found'));

// ----------------------------------------------------------------------

export default function Router() {
  const routes = useRoutes([
    {
      element: (
        <ProtectedRoute>
          <DashboardLayout>
            <Suspense>
              <Outlet />
            </Suspense>
          </DashboardLayout>
        </ProtectedRoute>
      ),
      children: [
        { element: <IndexPage />, index: true },
        { path: 'report', element: <ReportPage /> },
        { path: 'devices-activity', element: <DevicesActivityPage /> },
        { path: 'financing', element: <FinancingPage /> },
        { path: 'financing/filial/:id', element: <DevicesDetailPage /> },
      ],
    },
    {
      path: 'login',
      element: <LoginPage />,
    },
    {
      path: '404',
      element: <Page404 />,
    },
    {
      path: '*',
      element: <Navigate to="/404" replace />,
    },
  ]);

  return (
    <AuthProvider>
      <Suspense fallback={<div>Loading...</div>}>{routes}</Suspense>
    </AuthProvider>
  );
}
