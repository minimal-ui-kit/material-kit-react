// eslint-disable-next-line import/no-extraneous-dependencies
import { useSelector } from 'react-redux';
import React, { lazy, Suspense } from 'react';
import { Outlet, Navigate, useRoutes } from 'react-router-dom';

import DashboardLayout from 'src/layouts/dashboard';

import WBSPage from '../pages/wbs-list';
import FilesPage from '../pages/files-list';
import { useApi } from '../redux/api-calls';
import ProjectFieldsListPage from '../pages/project-fields-list';

// Lazy-loaded components
const IndexPage = lazy(() => import('src/pages/app'));
const BlogPage = lazy(() => import('src/pages/blog'));
const UserPage = lazy(() => import('src/pages/user'));
const LoginPage = lazy(() => import('src/pages/login'));
const JiraProjectsPage = lazy(() => import('src/pages/jira-projects-list'));
const Page404 = lazy(() => import('src/pages/page-not-found'));
export default function Router() {
  // const { fetchUser, isAuthenticated } = useContext(AppContext);
  const isAuthenticated = useSelector((state) => state.isAuthenticated);
  const api = useApi();
  // useEffect(() => {
  //   const funct = async () => {
  //     await api.fetchUser();
  //   };
  //   funct();
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, []);
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
    api.fetchUser();
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
    // api.fetchUser();
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
          path: 'resources',
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
          path: 'files/:fileId',
          element: (
            <ProtectedRoute>
              <WBSPage />
            </ProtectedRoute>
          ),
        },
        {
          path: 'jira-projects',
          element: (
            <ProtectedRoute>
              <JiraProjectsPage />
            </ProtectedRoute>
          ),
        },
        {
          path: 'jira-projects/:id',
          element: (
            <ProtectedRoute>
              <ProjectFieldsListPage />
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
