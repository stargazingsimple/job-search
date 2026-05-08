import { getJobs } from '../jobs'

const { get } = vi.hoisted(() => ({
  get: vi.fn(),
}))

vi.mock('@/api/index.js', () => ({
  HTTP: {
    get,
  },
}))

describe('jobs api', () => {
  describe('getJobs', () => {
    const MOCK_RESOLVED_DATA = [
      {
        id: 1,
        title: 'Java Engineer',
      },
    ]

    beforeEach(() => {
      get.mockResolvedValue({
        data: MOCK_RESOLVED_DATA,
      })
    })

    it('fetches jobs that candidates can apply to', async () => {
      await getJobs()

      expect(get).toHaveBeenCalledWith('/jobs.json')
    })

    it('extracts jobs from response', async () => {
      const { data } = await getJobs()

      expect(data).toStrictEqual(MOCK_RESOLVED_DATA)
    })
  })
})
