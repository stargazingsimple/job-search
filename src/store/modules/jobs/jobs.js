import { defineStore } from 'pinia'
import { getJobs } from '@/api/jobs/jobs'
import { useUserStore } from '../user/user'

export const FETCH_JOBS = 'FETCH_JOBS'
export const UNIQUE_ORGANIZATIONS = 'UNIQUE_ORGANIZATIONS'
export const UNIQUE_JOB_TYPES = 'UNIQUE_JOB_TYPES'
export const FILTERED_JOBS = 'FILTERED_JOBS'
export const INCLUDE_JOB_BY_ORGANIZATION = 'INCLUDE_JOB_BY_ORGANIZATION'
export const INCLUDE_JOB_BY_JOB_TYPE = 'INCLUDE_JOB_BY_JOB_TYPE'

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
    [UNIQUE_JOB_TYPES](state) {
      const uniqueJobTypes = new Set()

      state.jobs.forEach(({ jobType }) => {
        uniqueJobTypes.add(jobType)
      })

      return uniqueJobTypes
    },
    [INCLUDE_JOB_BY_ORGANIZATION]: () => (organization) => {
      const userStore = useUserStore()

      return (
        userStore.selectedOrganizations.length === 0 ||
        userStore.selectedOrganizations.includes(organization)
      )
    },
    [INCLUDE_JOB_BY_JOB_TYPE]: () => (jobType) => {
      const userStore = useUserStore()

      return userStore.selectedJobTypes.length === 0 || userStore.selectedJobTypes.includes(jobType)
    },
    [FILTERED_JOBS](state) {
      return state.jobs
        .filter(({ organization }) => this.INCLUDE_JOB_BY_ORGANIZATION(organization))
        .filter(({ jobType }) => this.INCLUDE_JOB_BY_JOB_TYPE(jobType))
    },
  },
})
