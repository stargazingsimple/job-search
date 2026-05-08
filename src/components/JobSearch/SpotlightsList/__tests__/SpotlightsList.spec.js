import { flushPromises, mount } from '@vue/test-utils'
import { findElementByText } from '@/tests/utils'
import SpotlightsList from '../SpotlightsList.vue'

const { getSpotlights } = vi.hoisted(() => ({
  getSpotlights: vi.fn(),
}))

vi.mock('@/api/spotlights/spotlights.js', () => ({
  getSpotlights: getSpotlights.mockResolvedValue({ data: [] }),
}))

const MOCK_RESOLVED_DATA_ITEM = {
  img: 'Some image',
  title: 'Some title',
  description: 'Some description',
}

describe('SpotlightsList', () => {
  let wrapper

  const createComponent = (defaultSlot = '') => {
    wrapper = mount(SpotlightsList, {
      slots: {
        default: defaultSlot,
      },
    })
  }

  afterEach(() => {
    vi.clearAllMocks()
    wrapper.unmount()
  })

  it('makes getSpotlights request', () => {
    createComponent()

    expect(getSpotlights).toHaveBeenCalled()
  })

  it.each(Object.keys(MOCK_RESOLVED_DATA_ITEM))(
    "provides '%s' property to parent component",
    async (property) => {
      getSpotlights.mockResolvedValue({ data: [MOCK_RESOLVED_DATA_ITEM] })

      createComponent(`
        <template #default="{${property}}">
            <h1>{{${property}}}</h1>
        </template>`)

      await flushPromises()

      const element = findElementByText(wrapper, 'h1', MOCK_RESOLVED_DATA_ITEM[property])

      expect(element.exists()).toBe(true)
    },
  )
})
