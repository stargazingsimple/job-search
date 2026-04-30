import { createPinia, setActivePinia } from 'pinia'
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
})
