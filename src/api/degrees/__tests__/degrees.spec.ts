import { getDegrees } from '../degrees.ts'

const { get } = vi.hoisted(() => ({
  get: vi.fn(),
}))

vi.mock('@/api/index.ts', () => ({
  HTTP: {
    get,
  },
}))

describe('degrees api', () => {
  describe('getDegrees', () => {
    const MOCK_RESOLVED_DATA = [
      {
        id: 1,
        degree: "Master's",
      },
    ]

    beforeEach(() => {
      get.mockResolvedValue({
        data: MOCK_RESOLVED_DATA,
      })
    })

    it('fetches degrees that candidates can apply to', async () => {
      await getDegrees()

      expect(get).toHaveBeenCalledWith('/degrees.json')
    })

    it('extracts degrees from response', async () => {
      const { data } = await getDegrees()

      expect(data).toStrictEqual(MOCK_RESOLVED_DATA)
    })
  })
})
