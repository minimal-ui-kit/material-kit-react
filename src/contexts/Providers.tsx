import type { ReactNode } from 'react';

import { BrowserRouter } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';

import { AuthProvider } from './auth-context';
import { UserProvider } from './user-context';
import { LoadingProvider } from './loading-context';
import { RouterGuard } from '../routes/components/router-guard';
import { UnsavedChangesProvider } from './unsaved-changes-context';

type ProvidersProps = {
  children: ReactNode;
};

export function Providers({ children }: ProvidersProps) {
  return (
      <HelmetProvider>
        <BrowserRouter>
          <LoadingProvider>
            <AuthProvider>
              <UserProvider>
                <UnsavedChangesProvider>
                  <RouterGuard>
                    {children}
                  </RouterGuard>
                </UnsavedChangesProvider>
              </UserProvider>
            </AuthProvider>
          </LoadingProvider>
        </BrowserRouter>
      </HelmetProvider>
  );
}