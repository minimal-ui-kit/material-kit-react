import { lazy, Suspense } from 'react';
import { Outlet, Navigate, useRoutes } from 'react-router-dom';

import DashboardLayout from 'src/layouts/dashboard';

export const IndexPage = lazy(() => import('src/pages/app'));
export const EnquiriesPage = lazy(() => import('src/pages/enquiries'));
export const SalesPage = lazy(() => import('src/pages/sales'));
export const TroubleTicketsPage = lazy(() => import('src/pages/trouble-tickets'));
export const OrdersPage = lazy(() => import('src/pages/orders'));
export const CustomerFeedbackPage = lazy(() => import('src/pages/customer-feedback'));
export const SubscriberManagementPage = lazy(() => import('src/pages/subscriber-management'));
export const DeliveryTrackingPage = lazy(() => import('src/pages/delivery-tracking'));
export const InventoryPage = lazy(() => import('src/pages/inventory'));
export const SalaryManagementPage = lazy(() => import('src/pages/salary-management'));
export const EmployeeManagementPage = lazy(() => import('src/pages/employee-management'));
export const SystemPerformancePage = lazy(() => import('src/pages/system-performance'));
export const SiteViewPage = lazy(() => import('src/pages/site-view'));
export const SystemMetricsPage = lazy(() => import('src/pages/system-metrics'));
export const RBACConfigurationPage = lazy(() => import('src/pages/rbac-configuration'));
export const LoginPage = lazy(() => import('src/pages/login'));
export const Page404 = lazy(() => import('src/pages/page-not-found'));

// ----------------------------------------------------------------------

export default function Router() {
  const routes = useRoutes([
    {
      element: (
        <DashboardLayout>
          <Suspense>
            <Outlet />
          </Suspense>
        </DashboardLayout>
      ),
      children: [
        { element: <IndexPage />, index: true },
        { path: 'enquiries', element: <EnquiriesPage /> },
        { path: 'sales', element: <SalesPage /> },
        { path: 'trouble-tickets', element: <TroubleTicketsPage /> },
        { path: 'orders', element: <OrdersPage /> },
        { path: 'customer-feedback', element: <CustomerFeedbackPage /> },
        { path: 'subscriber-management', element: <SubscriberManagementPage /> },
        { path: 'delivery-tracking', element: <DeliveryTrackingPage /> },
        { path: 'inventory', element: <InventoryPage /> },
        { path: 'salary-management', element: <SalaryManagementPage /> },
        { path: 'employee-management', element: <EmployeeManagementPage /> },
        { path: 'system-performance', element: <SystemPerformancePage /> },
        { path: 'site-view', element: <SiteViewPage /> },
        { path: 'system-metrics', element: <SystemMetricsPage /> },
        { path: 'rbac-configuration', element: <RBACConfigurationPage /> },
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

  return routes;
}
