import { defineStore } from 'pinia'
import { getJobs } from '@/api/jobs/jobs'
import { useUserStore } from '../user/user'

export const FETCH_JOBS = 'FETCH_JOBS'
export const UNIQUE_ORGANIZATIONS = 'UNIQUE_ORGANIZATIONS'
export const FILTERED_JOBS_BY_ORGANIZATION = 'FILTERED_JOBS_BY_ORGANIZATION'

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
  getters: {
    [UNIQUE_ORGANIZATIONS](state) {
      const uniqueOrganizations = new Set()

      state.jobs.forEach(({ organization }) => {
        uniqueOrganizations.add(organization)
      })

      return uniqueOrganizations
    },
    [FILTERED_JOBS_BY_ORGANIZATION](state) {
      const userStore = useUserStore()

      return userStore.selectedOrganizations.length
        ? state.jobs.filter(({ organization }) =>
            userStore.selectedOrganizations.includes(organization),
          )
        : state.jobs
    },
  },
})
