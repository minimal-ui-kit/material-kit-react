
export const refreshJwtMiddleware = ({ dispatch, getState }) => next => (action) => {
  return next(action)
}

export const notificationsMiddleware = ({ dispatch, getState }) => next => (action) => {
  if (action.type.endsWith('/rejected')) {
    console.error(action)
  }

  return next(action)
}