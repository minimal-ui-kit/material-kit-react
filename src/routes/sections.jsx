import React, { lazy, Suspense, useContext } from 'react';
import { Outlet, Navigate, useRoutes } from 'react-router-dom';

import DashboardLayout from 'src/layouts/dashboard';

import FilesPage from '../pages/files-list';
import { AppContext } from '../context/app-context';

// Lazy-loaded components
const IndexPage = lazy(() => import('src/pages/app'));
const BlogPage = lazy(() => import('src/pages/blog'));
const UserPage = lazy(() => import('src/pages/user'));
const LoginPage = lazy(() => import('src/pages/login'));
const ProductsPage = lazy(() => import('src/pages/products'));
const Page404 = lazy(() => import('src/pages/page-not-found'));

export default function Router() {
  const { isAuthenticated } = useContext(AppContext);

  //
  // useEffect(() => {
  //   const checkAuthentication = async () => {
  //     const token = localStorage.getItem('token');
  //     if (token) {
  //       console.log('Checking authentication');
  //       await fetchUser();
  //       axios.defaults.headers.common.Authorization = `Bearer ${token}`;
  //       return true;
  //     }
  //     return false;
  //   };
  //   setIsAuthenticated(checkAuthentication);
  // }, [fetchUser]);

  // Authenticated wrapper component
  // eslint-disable-next-line react/prop-types
  const ProtectedRoute = ({ children }) => {
    // const isAuthenticated = checkAuthentication();

    // const authStatus = await checkAuthentication();
    // setIsAuthenticated(authStatus);

    if (!isAuthenticated) {
      return <Navigate to="/login" replace />;
    }

    return children;
  };

  // Public wrapper component
  // eslint-disable-next-line react/prop-types
  const PublicRoute = ({ children }) => {
    // const isAuthenticated = checkAuthentication();

    if (isAuthenticated) {
      return <Navigate to="/" replace />;
    }

    return children;
  };

  return useRoutes([
    {
      element: (
        <DashboardLayout>
          <Suspense fallback={<div>Loading...</div>}>
            <Outlet />
          </Suspense>
        </DashboardLayout>
      ),
      children: [
        {
          element: (
            <ProtectedRoute>
              <IndexPage />
            </ProtectedRoute>
          ),
          index: true,
        },
        {
          path: 'user',
          element: (
            <ProtectedRoute>
              <UserPage />
            </ProtectedRoute>
          ),
        },
        {
          path: 'files',
          element: (
            <ProtectedRoute>
              <FilesPage />
            </ProtectedRoute>
          ),
        },
        {
          path: 'products',
          element: (
            <ProtectedRoute>
              <ProductsPage />
            </ProtectedRoute>
          ),
        },
        {
          path: 'blog',
          element: (
            <ProtectedRoute>
              <BlogPage />
            </ProtectedRoute>
          ),
        },
      ],
    },
    {
      path: 'login',
      element: (
        <PublicRoute>
          <LoginPage />
        </PublicRoute>
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
