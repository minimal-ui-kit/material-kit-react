import { type ReactNode } from 'react';

import { AuthProvider, useAuth } from 'src/contexts/auth-context';
import { NotificationProvider } from 'src/contexts/notification-context';
import { SocketProvider } from 'src/contexts/socket-context';

// ----------------------------------------------------------------------

type AppProvidersProps = {
  children: ReactNode;
};

function InnerProviders({ children }: AppProvidersProps) {
  const { user } = useAuth();

  return (
    <NotificationProvider userId={user?.id || ''}>
      <SocketProvider userId={user?.id || ''} serverUrl={import.meta.env.VITE_SOCKET_URL || 'http://localhost:3001'}>
        {children}
      </SocketProvider>
    </NotificationProvider>
  );
}

export function AppProviders({ children }: AppProvidersProps) {
  return (
    <AuthProvider>
      <InnerProviders>{children}</InnerProviders>
    </AuthProvider>
  );
}

