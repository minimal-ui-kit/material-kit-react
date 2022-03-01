import axios from 'axios'

const withAuthorization = (authorization, config = {}) => ({
  ...config,
  headers: {
    ...config.headers,
    Authorization: `Bearer ${authorization}`,
  },
})

class RemotesManager {
  constructor (config) {
    this.BACKEND_AUTH = null
    this.BACKEND_USER = null
    this.BACKEND_DATASETS = null
    this.BACKEND_ACTIONS = null
    this.BACKEND_API = null
  }

  initialize (config) {
    console.log('app config', config)

    this.BACKEND_AUTH = axios.create({
      baseURL: config.api.auth.uri,
      timeout: 60000,
    })

    this.BACKEND_USER = axios.create({
      baseURL: config.api.user.uri,
      timeout: 60000,
    })

    this.BACKEND_DATASETS = axios.create({
      baseURL: config.api.datasets.uri,
      timeout: 60000,
    })

    this.BACKEND_ACTIONS = axios.create({
      baseURL: config.api.actions.uri,
      timeout: 60000,
    })

    this.BACKEND_API = axios.create({
      baseURL: config.api.api.uri,
      timeout: 60000,
    })
  }
}

const remotesManager = new RemotesManager()

export {
  remotesManager,
  withAuthorization,
}