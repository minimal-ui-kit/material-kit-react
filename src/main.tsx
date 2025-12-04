import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { Outlet, RouterProvider, createBrowserRouter } from 'react-router';

import App from './app';
import { routesSection } from './routes/sections';
import { ErrorBoundary } from './routes/components';
import { AppProviders } from './providers/app-providers';

// ----------------------------------------------------------------------

const router = createBrowserRouter([
  {
    Component: () => (
      <AppProviders>
        <App>
          <Outlet />
        </App>
      </AppProviders>
    ),
    errorElement: <ErrorBoundary />,
    children: routesSection,
  },
]);

const root = createRoot(document.getElementById('root')!);

root.render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
