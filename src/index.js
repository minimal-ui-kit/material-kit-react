import React from 'react'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'
import ReactDOM from 'react-dom'
import { BrowserRouter } from 'react-router-dom'
import { HelmetProvider } from 'react-helmet-async'

import { store, persistor } from '@src/store'
import ConfigLoader from '@src/config/ConfigLoader'
import Splash from '@src/config/Splash/Splash'
import './index.css'
import App from './App'

import * as serviceWorker from './serviceWorker'
import reportWebVitals from './reportWebVitals'
import 'simplebar/src/simplebar.css'

ReactDOM.render(
  <HelmetProvider>
    <BrowserRouter>
      <React.StrictMode>
        <Provider store={store}>
          <PersistGate loading={null} persistor={persistor}>
            <ConfigLoader
              ready={() => <App />}
              loading={() => <Splash />}
            />
          </PersistGate>
        </Provider>
      </React.StrictMode>,
    </BrowserRouter>
  </HelmetProvider>,
  document.getElementById('root')
)

// If you want to enable client cache, register instead.
serviceWorker.unregister()

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()