import jwt_decode from 'jwt-decode'
import { createAsyncThunk } from '@reduxjs/toolkit'
import { remotesManager } from '@src/remotes'
import { getAuthUri, getAuthParams, getRefreshParams, getLogoutParams } from '@src/utils'
import config from '@src/config'
import { clearSecurity, logout } from '../index'
import { selectRefreshToken } from './selectors'

export const initSecurity = createAsyncThunk('security/init',
  async (authCode, { dispatch, getState }) => {
    const state = getState()
    const refresh_token = selectRefreshToken(state)
    const decoded = refresh_token && jwt_decode(refresh_token)

    if (decoded && (decoded.exp * 1000 - Date.now()) > 5000) {
      // refresh token is not expired
      const res = await dispatch(refreshToken())
      return res.payload
    }

    await dispatch(clearSecurity())
    if (!authCode)
      window.location.replace(getAuthUri({ redirectSuffix: window.location.pathname }))

    const { data } = await remotesManager.BACKEND_AUTH.post('/realms/master/protocol/openid-connect/token', new URLSearchParams({
      ...getAuthParams({ redirectSuffix: window.location.pathname }),
      code: authCode,
    }).toString(), {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    })

    return data
  },
)

export const refreshToken = createAsyncThunk('security/refreshToken',
  async (arg, { dispatch, getState }) => {
    const state = getState()
    const refresh_token = selectRefreshToken(state)

    try {
      const { data } = await remotesManager.BACKEND_AUTH.post('/realms/master/protocol/openid-connect/token', new URLSearchParams({
        ...getRefreshParams({ redirectSuffix: window.location.pathname }),
        refresh_token: refresh_token,
      }).toString(), {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      })
      return data
    } catch (e) {
      console.error('can not refresh token', e)
      dispatch(logout())
    }
  },
)

export const loadUser = createAsyncThunk(
  'security/loadUser',
  async (arg, { dispatch, getState }) => {
    const { data } = await remotesManager.BACKEND_USER.post('/session/set', getState().security.auth)
    return data
  },
)

export const logoutFromApp = createAsyncThunk('security/logoutFromApp',
  async (arg, { dispatch, getState }) => {
    const refresh_token = selectRefreshToken(getState())
    const redirectParams = new URLSearchParams({
      ...getLogoutParams(),
      refresh_token: refresh_token,
    }).toString()
    await clearSecurity()
    window.location.replace(config.api.auth.uri + '/realms/master/protocol/openid-connect/logout?' + redirectParams)
  },
)

const extraReducers = {
  [initSecurity.pending]: (state, action) => {
    state.authLoading = true
    state.authLoaded = false
    state.authError = null
  },
  [initSecurity.fulfilled]: (state, action) => {
    state.authLoading = false
    state.authLoaded = true
    state.authError = null
    state.auth = action.payload
  },
  [initSecurity.rejected]: (state, action) => {
    state.authLoading = false
    state.authLoaded = false
    state.authError = action.error
    window.location.replace(getAuthUri({ redirectSuffix: window.location.pathname }))
  },

  [loadUser.fulfilled]: (state, action) => {
    state.user = action.payload.user
    state.roles = action.payload.roles
    state.currentRole = action.payload.roles.find(r => r.is_main)
  },
  [loadUser.rejected]: (state, action) => {
    console.error('loadUser.rejected', action)
  },

  [refreshToken.fulfilled]: (state, action) => {
    state.auth = action.payload
  },
  [refreshToken.rejected]: (state, action) => {
    console.error('refreshToken.rejected', action)
  },

  [logoutFromApp.fulfilled]: (state, action) => {

  },
}

export default extraReducers