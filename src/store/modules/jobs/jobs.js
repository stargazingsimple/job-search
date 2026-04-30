import { getJobs } from '@/api/jobs/jobs'
import { defineStore } from 'pinia'

export const FETCH_JOBS = 'FETCH_JOBS'

export const useJobsStore = defineStore('jobs', {
  state() {
    return {
      jobs: [],
    }
  },
  actions: {
    async [FETCH_JOBS]() {
      const { data } = await getJobs()

      this.jobs = data
    },
  },
})
