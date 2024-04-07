import { thunk } from 'redux-thunk';
import { compose, createStore, applyMiddleware } from 'redux'; // Import Redux Thunk middleware
import appReducer from './reducers';

const composeEnhancers =
  typeof window === 'object' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({})
    : compose;

const middleware = [thunk]; // Add Redux Thunk middleware to the array

const enhancer = composeEnhancers(
  applyMiddleware(...middleware)
  // other store enhancers if any
);

const store = createStore(appReducer, enhancer);

export default store;
