import { createPinia, setActivePinia } from 'pinia'
import { useUserStore } from '../../user/user'
import {
  FETCH_JOBS,
  INCLUDE_JOB_BY_DEGREE,
  INCLUDE_JOB_BY_JOB_TYPE,
  INCLUDE_JOB_BY_ORGANIZATION,
  UNIQUE_JOB_TYPES,
  UNIQUE_ORGANIZATIONS,
  useJobsStore,
} from '../jobs'
import type { Job } from '@/api/jobs/types.ts'

const { getJobs } = vi.hoisted(() => ({
  getJobs: vi.fn(),
}))

vi.mock('@/api/jobs/jobs.ts', () => ({
  getJobs: getJobs.mockResolvedValue({ data: [] }),
}))

describe('jobs store module', () => {
  let store: ReturnType<typeof useJobsStore>

  beforeEach(() => {
    setActivePinia(createPinia())
    store = useJobsStore()
  })

  describe('state', () => {
    it('store job listings', () => {
      expect(store.jobs).toStrictEqual([])
    })
  })

  describe('actions', () => {
    describe('FETCH_JOBS', () => {
      const MOCK_RESOLVED_DATA = ['JOB 1', 'JOB 2']

      beforeEach(() => {
        getJobs.mockResolvedValue({ data: MOCK_RESOLVED_DATA })
        store[FETCH_JOBS]()
      })

      it('makes API request', () => {
        expect(getJobs).toHaveBeenCalled()
      })

      it('stores received jobs', () => {
        expect(store.jobs).toStrictEqual(MOCK_RESOLVED_DATA)
      })
    })
  })

  describe('getters', () => {
    it('finds unique organizations from list of jobs', () => {
      store.jobs = [
        {
          organization: 'Google',
        },
        {
          organization: 'Amazon',
        },
        {
          organization: 'Google',
        },
      ] as Job[]

      const result = store[UNIQUE_ORGANIZATIONS]

      expect(result).toStrictEqual(new Set(['Google', 'Amazon']))
    })

    it('finds unique job types from list of jobs', () => {
      store.jobs = [
        {
          jobType: 'Full-time',
        },
        {
          jobType: 'Temporary',
        },
        {
          jobType: 'Full-time',
        },
      ] as Job[]

      const result = store[UNIQUE_JOB_TYPES]

      expect(result).toStrictEqual(new Set(['Full-time', 'Temporary']))
    })

    it.each`
      selectedOrganizations
      ${[]}
      ${['Google', 'Amazon']}
    `(
      'verifies jobs are included for selected organizations $selectedOrganizations',
      ({ selectedOrganizations }) => {
        const userStore = useUserStore()
        const organization = 'Amazon'

        userStore.selectedOrganizations = selectedOrganizations

        const result = store[INCLUDE_JOB_BY_ORGANIZATION](organization)

        expect(result).toBe(true)
      },
    )

    it.each`
      selectedJobTypes
      ${[]}
      ${['Full-time', 'Part-time']}
    `(
      'verifies jobs are included for selected job types $selectedJobTypes',
      ({ selectedJobTypes }) => {
        const userStore = useUserStore()
        const jobType = 'Part-time'

        userStore.selectedJobTypes = selectedJobTypes

        const result = store[INCLUDE_JOB_BY_JOB_TYPE](jobType)

        expect(result).toBe(true)
      },
    )

    it.each`
      selectedDegrees
      ${[]}
      ${["Master's", "Bachelor's"]}
    `('verifies jobs are included for selected degrees $selectedDegrees', ({ selectedDegrees }) => {
      const userStore = useUserStore()
      const degree = "Master's"

      userStore.selectedDegrees = selectedDegrees

      const result = store[INCLUDE_JOB_BY_DEGREE](degree)

      expect(result).toBe(true)
    })
  })
})
