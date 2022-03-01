import config from '@src/config'

export const getAuthParams = ({ redirectSuffix }) => {
  return {
    grant_type: 'authorization_code',
    response_type: 'code',
    client_id: config.api.auth.client_id,
    redirect_uri: `${config.api.auth.redirect_uri}${redirectSuffix || ''}`,
  }
}

export const getRefreshParams = ({ redirectSuffix }) => {
  return {
    grant_type: 'refresh_token',
    client_id: config.api.auth.client_id,
    redirect_uri: `${config.api.auth.redirect_uri}${redirectSuffix || ''}`,
  }
}

export const getLogoutParams = () => {
  return {
    client_id: config.api.auth.client_id,
    post_logout_redirect_uri: config.api.auth.redirect_uri,
  }
}

export const getAuthUri = ({ redirectSuffix }) => {
  return `${config.api.auth.am_uri}?${new URLSearchParams(getAuthParams({ redirectSuffix })).toString()}`
}

export const normalizeStr = str => str.toLowerCase().replace(/\s/g, '')

export * from './reduxUtils'