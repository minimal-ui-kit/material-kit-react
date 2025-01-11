import { StrictMode } from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';

import { AuthProvider } from 'src/contexts/auth-context';
import { UserProvider } from 'src/contexts/user-context';

import './i18n';
import App from './app';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);

root.render(
    <StrictMode>
        <HelmetProvider>
            <BrowserRouter>
                <AuthProvider>
                    <UserProvider>
                        <App />
                    </UserProvider>
                </AuthProvider>
            </BrowserRouter>
        </HelmetProvider>
    </StrictMode>
);