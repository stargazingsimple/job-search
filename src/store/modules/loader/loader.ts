import { defineStore } from 'pinia'

interface LoaderState {
  requestsCount: number
}

export const SHOW_LOADER = 'SHOW_LOADER'
export const HIDE_LOADER = 'HIDE_LOADER'
export const IS_LOADING = 'IS_LOADING'

export const useLoaderStore = defineStore('loader', {
  state: (): LoaderState => {
    return {
      requestsCount: 0,
    }
  },
  actions: {
    [SHOW_LOADER]() {
      this.requestsCount += 1
    },
    [HIDE_LOADER]() {
      if (this.IS_LOADING) {
        this.requestsCount -= 1
      }
    },
  },
  getters: {
    [IS_LOADING]: ({ requestsCount }) => requestsCount > 0,
  },
})
