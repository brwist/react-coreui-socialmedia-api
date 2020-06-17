import axios from 'axios'
import { apiURL } from './endpoints'
const axiosConfig = store => {
  store.subscribe(() => {
    axios.defaults.baseURL = `${apiURL}`
    axios.defaults.headers = {
      "accept": "application/json",
      "XUser": "aditya@lightboxlive.com",
      "XToken": "V2nCtB@x3m",
    }

  })
}
export default axiosConfig