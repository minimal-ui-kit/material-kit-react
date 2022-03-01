import { getAuthUri } from '@src/utils'

const reducers = {
  clearSecurity: (state) => {
    state.user = null
    state.roles = null
    state.auth = null
  },

  logout: (state) => {
    state.user = null
    state.roles = null
    state.auth = null

    window.location.replace(getAuthUri({ redirectSuffix: window.location.pathname }))
  },
}

export default reducers