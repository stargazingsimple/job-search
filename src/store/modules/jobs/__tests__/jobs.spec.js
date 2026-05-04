import { createPinia, setActivePinia } from 'pinia'
import { useUserStore } from '../../user/user'
import { useJobsStore } from '../jobs'

const { getJobs } = vi.hoisted(() => ({
  getJobs: vi.fn(),
}))

vi.mock(import('@/api/jobs/jobs.js'), () => ({
  getJobs: getJobs.mockResolvedValue({ data: [] }),
}))

describe('jobs store module', () => {
  let store

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
        store.FETCH_JOBS()
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
      ]

      const result = store.UNIQUE_ORGANIZATIONS

      expect(result).toEqual(new Set(['Google', 'Amazon']))
    })

    it.each`
      selectedOrganizations      | expectedResult
      ${['Google', 'Microsoft']} | ${[{ organization: 'Google' }, { organization: 'Microsoft' }]}
      ${[]}                      | ${[{ organization: 'Google' }, { organization: 'Amazon' }, { organization: 'Microsoft' }]}
    `(
      'identifies jobs that are associated with the given organizations $selectedOrganizations',
      ({ selectedOrganizations, expectedResult }) => {
        store.jobs = [
          {
            organization: 'Google',
          },
          {
            organization: 'Amazon',
          },
          {
            organization: 'Microsoft',
          },
        ]

        const userStore = useUserStore()

        userStore.selectedOrganizations = selectedOrganizations

        const result = store.FILTERED_JOBS_BY_ORGANIZATION

        expect(result).toStrictEqual(expectedResult)
      },
    )

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
      ]

      const result = store.UNIQUE_JOB_TYPES

      expect(result).toEqual(new Set(['Full-time', 'Temporary']))
    })

    it.each`
      selectedJobTypes              | expectedResult
      ${['Full-time', 'Temporary']} | ${[{ jobType: 'Full-time' }, { jobType: 'Temporary' }]}
      ${[]}                         | ${[{ jobType: 'Full-time' }, { jobType: 'Temporary' }, { jobType: 'Part-time' }]}
    `(
      'identifies jobs that are associated with the given job types $selectedJobTypes',
      ({ selectedJobTypes, expectedResult }) => {
        store.jobs = [
          {
            jobType: 'Full-time',
          },
          {
            jobType: 'Temporary',
          },
          {
            jobType: 'Part-time',
          },
        ]

        const userStore = useUserStore()

        userStore.selectedJobTypes = selectedJobTypes

        const result = store.FILTERED_JOBS_BY_JOB_TYPES

        expect(result).toStrictEqual(expectedResult)
      },
    )
  })
})
