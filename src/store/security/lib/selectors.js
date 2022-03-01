import { createSelector } from 'reselect'

export const selectSecurity = state => state.security
export const selectAuth = state => state.security.auth
export const selectUser = state => state.security.user
export const selectAccessToken = state => state.security.auth.access_token
export const selectRefreshToken = state => state?.security?.auth?.refresh_token

export const selectAuthModel = createSelector(
  selectSecurity,
  security => ({
    loading: security.authLoading,
    loaded: security.authLoaded,
    error: security.authError,
    payload: security.auth,
  }),
)