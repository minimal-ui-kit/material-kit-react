import { configureStore } from '@reduxjs/toolkit'
import storage from 'redux-persist/lib/storage'
import { persistStore, persistReducer, FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER } from 'redux-persist'

import securityReducer from './security'
import { refreshJwtMiddleware, notificationsMiddleware } from './middlewares'

const store = configureStore({
  reducer: {
    security: persistReducer({ key: 'security', whitelist: ['auth'], storage }, securityReducer),
  },
  middleware: getDefaultMiddleware => getDefaultMiddleware(
    {
      serializableCheck: false,
      ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
    },
  )
    .concat(refreshJwtMiddleware)
    .concat(notificationsMiddleware)
  ,
})

const persistor = persistStore(store)

export { store, persistor }
export * from './security'
