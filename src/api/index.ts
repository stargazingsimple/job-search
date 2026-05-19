import axios from 'axios'

export const HTTP = axios.create({
  baseURL: 'https://job-search-35443-default-rtdb.europe-west1.firebasedatabase.app/',
  timeout: 10000,
})
