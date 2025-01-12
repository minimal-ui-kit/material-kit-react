import { StrictMode } from 'react';
import ReactDOM from 'react-dom/client';

import './i18n';
import App from './app';
import {Providers} from "./contexts/Providers";

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);

root.render(
    <StrictMode>
        <Providers>
            <App />
        </Providers>
    </StrictMode>
);