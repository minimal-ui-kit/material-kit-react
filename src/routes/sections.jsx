import { lazy, Suspense } from 'react';
import { Outlet, Navigate, useRoutes } from 'react-router-dom';

import DashboardLayout from 'src/layouts/dashboard';
import AthleticsEdit from 'src/sections/products/athletics-edit';
import AthleticsAdd from 'src/sections/products/athletics-res';
import CricketEdit from 'src/sections/products/cricket-edit';
import CricketAdd from 'src/sections/products/cricket-res';
import FootballEdit from 'src/sections/products/football-edit';
import FootballAdd from 'src/sections/products/football-res';
import Screen1 from 'src/sections/products/result-type';

export const IndexPage = lazy(() => import('src/pages/app'));
export const BlogPage = lazy(() => import('src/pages/blog'));
export const UserPage = lazy(() => import('src/pages/user'));
export const EmpLeaderboardPage = lazy(() => import('src/pages/emp'));
export const LoginPage = lazy(() => import('src/pages/login'));
export const ProductsPage = lazy(() => import('src/pages/products'));
export const Page404 = lazy(() => import('src/pages/page-not-found'));
export const SecretPage = lazy(()=> import('src/pages/asmitaasmita'));
export const AddUserPage = lazy(()=> import('src/pages/add-user'));

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
        { path: 'user', element: <UserPage /> },
        { path: 'emp', element: <EmpLeaderboardPage /> },
        { path: 'products', 
            element: ( 
                  <Outlet />
            ),
            children: [
              { element: <ProductsPage />, index: true },
              { path: 'addresult', 
                element: (
                  <Outlet />
                ),
                children:[
                  {element: <Screen1/>, index: true},
                  {path:"2",element:<ProductsPage/>},
                  {path:"football",element:<FootballAdd/>},
                  {path:"athletics",element:<AthleticsAdd/>},
                  {path:"cricket",element:<CricketAdd/>},
                ]
              },
              { path: 'editresults', 
              element: (
                <Outlet />
              ),
              children:[         
                {path:"football/:id",element:<FootballEdit />},
                {path:"athlete/:id",element:<AthleticsEdit/>},
                {path:"cricket/:id",element:<CricketEdit/>},
              ]
            },
            ],
          
        },
        // { path: 'blog', element: <BlogPage /> },
        { path: 'asmitaasmita', element: <SecretPage /> },
        {
          path: 'adduser',
          element: <AddUserPage />,
        },
        {
          path: 'login',
          element: <LoginPage />,
        },
      ],
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
