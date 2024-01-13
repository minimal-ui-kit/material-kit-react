import {Suspense} from 'react';
import ReactDOM from 'react-dom/client';
import {BrowserRouter} from 'react-router-dom';
import {HelmetProvider} from 'react-helmet-async';
import {DevSupport} from "@react-buddy/ide-toolbox";

import App from './app';
import {useInitial, ComponentPreviews} from "./dev";

// ----------------------------------------------------------------------

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
    <HelmetProvider>
        <BrowserRouter>
            <Suspense>
                <DevSupport ComponentPreviews={ComponentPreviews}
                            useInitialHook={useInitial}
                >
                    <App/>
                </DevSupport>
            </Suspense>
        </BrowserRouter>
    </HelmetProvider>
);
