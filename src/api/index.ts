import axios from 'axios'
import { useToast } from 'vue-toastification'
import { HIDE_LOADER, SHOW_LOADER, useLoaderStore } from '@/store/modules/loader/loader'

const API_KEY = 'AIzaSyDPgrEoezia5sTk4QUgC3QLbOztudY2JlE'

const toast = useToast()

export const HTTP = axios.create({
  baseURL: 'https://job-search-35443-default-rtdb.europe-west1.firebasedatabase.app/',
  timeout: 10000,
})

HTTP.interceptors.request.use(
  function (config) {
    const loaderStore = useLoaderStore()

    loaderStore[SHOW_LOADER]()
    return config
  },
  function (error) {
    const loaderStore = useLoaderStore()

    loaderStore[HIDE_LOADER]()
    return Promise.reject(error)
  },
)

HTTP.interceptors.response.use(
  function (response) {
    const loaderStore = useLoaderStore()

    loaderStore[HIDE_LOADER]()
    return response
  },
  function (error) {
    const loaderStore = useLoaderStore()

    toast.error(error.message || 'Something went wrong')
    loaderStore[HIDE_LOADER]()
  },
)

export const AUTH = axios.create({
  baseURL: 'https://identitytoolkit.googleapis.com/v1/',
  timeout: 10000,
  params: {
    key: API_KEY,
  },
})
