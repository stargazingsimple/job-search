import { setActivePinia, createPinia } from 'pinia'
import { useDegreesStore } from '../degrees.ts'
import type { Degree } from '@/api/degrees/types.ts'

const { getDegrees } = vi.hoisted(() => ({
  getDegrees: vi.fn(),
}))

vi.mock('@/api/degrees/degrees.ts', () => ({
  getDegrees: getDegrees.mockResolvedValue({ data: [] }),
}))

describe('degrees store module', () => {
  let store: ReturnType<typeof useDegreesStore>

  beforeEach(() => {
    setActivePinia(createPinia())
    store = useDegreesStore()
  })

  describe('state', () => {
    it('stores all degrees that jobs may require', () => {
      expect(store.degrees).toStrictEqual([])
    })
  })

  describe('actions', () => {
    describe('FETCH_DEGREES', () => {
      const MOCK_RESOLVED_DATA = ['DEGREE 1', 'DEGREE 2', 'DEGREE 3']

      beforeEach(() => {
        getDegrees.mockResolvedValue({ data: MOCK_RESOLVED_DATA })
        store.FETCH_DEGREES()
      })

      it('makes API request', () => {
        expect(getDegrees).toHaveBeenCalled()
      })

      it('stores received degrees', () => {
        expect(store.degrees).toStrictEqual(MOCK_RESOLVED_DATA)
      })
    })
  })

  describe('getters', () => {
    it('finds unique degrees from collection of degrees', () => {
      store.degrees = [
        {
          degree: "Master's",
        },
        {
          degree: "Bachelor's",
        },
        {
          degree: "Master's",
        },
      ] as Degree[]

      const result = store.UNIQUE_DEGREES

      expect(result).toStrictEqual(new Set(["Master's", "Bachelor's"]))
    })
  })
})
