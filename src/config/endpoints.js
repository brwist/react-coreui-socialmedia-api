const envConfig = {
  development: {
    apiURL: 'https://cors-anywhere.herokuapp.com/https://api-dev.lightboxlive.com/v0/admin/'
  },
  qa: {
    apiURL: ''
  },
  uat: {
    apiURL: ''
  },
  production: {
    apiURL: ''
  },
}

const currentEnv = envConfig[process.env.REACT_APP_ENV] ? process.env.REACT_APP_ENV : 'development'

const apiURL = envConfig[currentEnv].apiURL

export { apiURL }