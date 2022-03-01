const config = {}

const loadConfig = () => {
  return fetch('/config.json')
    .then(res => res.json())
    .then((newconfig) => {
      for(let prop in config) {
        delete config[prop]
      }
      for(let prop in newconfig) {
        config[prop] = newconfig[prop]
      }

      return config
    })
}

export { loadConfig }
export default config