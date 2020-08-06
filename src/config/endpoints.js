const envConfig = {
  development: {
    apiURL: 'https://api-dev.lightboxlive.com/v0/admin/',
    cdnURL: 'https://d3le8hkzzdixl5.cloudfront.net/'
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

const { apiURL } = envConfig[currentEnv]
const { cdnURL } = envConfig[currentEnv]

export { apiURL, cdnURL }