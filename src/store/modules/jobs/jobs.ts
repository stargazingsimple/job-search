import { defineStore } from 'pinia'
import { getJobs } from '@/api/jobs/jobs.ts'
import { useUserStore } from '../user/user'
import type { Job } from '@/api/jobs/types.ts'

export const FETCH_JOBS = 'FETCH_JOBS'
export const UNIQUE_ORGANIZATIONS = 'UNIQUE_ORGANIZATIONS'
export const UNIQUE_JOB_TYPES = 'UNIQUE_JOB_TYPES'
export const FILTERED_JOBS = 'FILTERED_JOBS'
export const INCLUDE_JOB_BY_ORGANIZATION = 'INCLUDE_JOB_BY_ORGANIZATION'
export const INCLUDE_JOB_BY_JOB_TYPE = 'INCLUDE_JOB_BY_JOB_TYPE'

export interface JobsState {
  jobs: Job[]
}

export const useJobsStore = defineStore('jobs', {
  state(): JobsState {
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
      const uniqueOrganizations = new Set<string>()

      state.jobs.forEach(({ organization }) => {
        uniqueOrganizations.add(organization)
      })

      return uniqueOrganizations
    },
    [UNIQUE_JOB_TYPES](state) {
      const uniqueJobTypes = new Set<string>()

      state.jobs.forEach(({ jobType }) => {
        uniqueJobTypes.add(jobType)
      })

      return uniqueJobTypes
    },
    [INCLUDE_JOB_BY_ORGANIZATION]: () => (organization: string) => {
      const userStore = useUserStore()

      return (
        userStore.selectedOrganizations.length === 0 ||
        userStore.selectedOrganizations.includes(organization)
      )
    },
    [INCLUDE_JOB_BY_JOB_TYPE]: () => (jobType: string) => {
      const userStore = useUserStore()

      return userStore.selectedJobTypes.length === 0 || userStore.selectedJobTypes.includes(jobType)
    },
    [FILTERED_JOBS](state): Job[] {
      return state.jobs
        .filter(({ organization }) => this.INCLUDE_JOB_BY_ORGANIZATION(organization))
        .filter(({ jobType }) => this.INCLUDE_JOB_BY_JOB_TYPE(jobType))
    },
  },
})
