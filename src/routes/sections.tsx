import { lazy, Suspense } from 'react';
import { Outlet, Navigate, useRoutes } from 'react-router-dom';

import Box from '@mui/material/Box';
import LinearProgress, { linearProgressClasses } from '@mui/material/LinearProgress';

import { varAlpha } from 'src/theme/styles';
import { AuthLayout } from 'src/layouts/auth';
import { DashboardLayout } from 'src/layouts/dashboard';

// ----------------------------------------------------------------------

export const HomePage = lazy(() => import('src/pages/home'));
export const BlogPage = lazy(() => import('src/pages/blog'));
export const UserPage = lazy(() => import('src/pages/user'));
export const SignInPage = lazy(() => import('src/pages/sign-in'));
export const SignUpPage = lazy(() => import('src/pages/sign-up'));
export const ActivitiesPage = lazy(() => import('src/pages/activities'));
export const Page404 = lazy(() => import('src/pages/page-not-found'));
export const ProductsDetailsPage = lazy(() => import('src/pages/product-detail'));
export const NewScheduledActivity = lazy(() => import('src/pages/add-new-scheduled-activity'));
export const NewOneTimeActivity = lazy(() => import('src/pages/add-new-one-time-activity'));
export const ProductCustomerPage = lazy(() => import('src/pages/product-customers'));
export const ProfilePage = lazy(() => import('src/pages/profile'));
export const EditProfilePage = lazy(() => import('src/pages/edit-profile'));

// ----------------------------------------------------------------------

const renderFallback = (
  <Box display="flex" alignItems="center" justifyContent="center" flex="1 1 auto">
    <LinearProgress
      sx={{
        width: 1,
        maxWidth: 320,
        bgcolor: (theme) => varAlpha(theme.vars.palette.text.primaryChannel, 0.16),
        [`& .${linearProgressClasses.bar}`]: { bgcolor: 'text.primary' },
      }}
    />
  </Box>
);

export function Router() {
  return useRoutes([
    {
      element: (
        <DashboardLayout>
          <Suspense fallback={renderFallback}>
            <Outlet />
          </Suspense>
        </DashboardLayout>
      ),
      children: [
        { element: <HomePage />, index: true },
        { path: 'bookings', element: <UserPage /> },
        { path: 'activities', element: <ActivitiesPage /> },
        { path: 'blog', element: <BlogPage /> },
        { path: 'product/:productId', element: <ProductsDetailsPage /> },
        { path: 'add-scheduled-activity', element: <NewScheduledActivity /> },
        { path: 'add-one-time-activity', element: <NewOneTimeActivity /> },
        { path: 'product/:productId/customers', element: <ProductCustomerPage /> },
        { path: 'profile', element: <ProfilePage /> },
        { path: 'edit-profile', element: <EditProfilePage /> },
      ],
    },
    {
      path: 'sign-in',
      element: (
        <AuthLayout>
          <SignInPage />
        </AuthLayout>
      ),
    },
    {
      path: 'sign-up',
      element: (
        <AuthLayout>
          <SignUpPage />
        </AuthLayout>
      ),
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
}
