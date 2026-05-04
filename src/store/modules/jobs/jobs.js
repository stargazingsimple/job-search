import { defineStore } from 'pinia'
import { getJobs } from '@/api/jobs/jobs'
import { useUserStore } from '../user/user'

export const FETCH_JOBS = 'FETCH_JOBS'
export const UNIQUE_ORGANIZATIONS = 'UNIQUE_ORGANIZATIONS'
export const FILTERED_JOBS_BY_ORGANIZATION = 'FILTERED_JOBS_BY_ORGANIZATION'
export const UNIQUE_JOB_TYPES = 'UNIQUE_JOB_TYPES'
export const FILTERED_JOBS_BY_JOB_TYPES = 'FILTERED_JOBS_BY_JOB_TYPES'

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
    [UNIQUE_JOB_TYPES](state) {
      const uniqueJobTypes = new Set()

      state.jobs.forEach(({ jobType }) => {
        uniqueJobTypes.add(jobType)
      })

      return uniqueJobTypes
    },
    [FILTERED_JOBS_BY_JOB_TYPES](state) {
      const userStore = useUserStore()

      return userStore.selectedJobTypes.length
        ? state.jobs.filter(({ jobType }) => userStore.selectedJobTypes.includes(jobType))
        : state.jobs
    },
  },
})
