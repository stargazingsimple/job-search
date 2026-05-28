import { mount, type VueWrapper } from '@vue/test-utils'
import { createTestingPinia } from '@pinia/testing'
import JobFiltersSidebarCheckboxGroup from '../JobFiltersSidebarCheckboxGroup.vue'

const { router } = vi.hoisted(() => {
  return {
    router: {
      push: vi.fn(),
    },
  }
})

vi.mock('vue-router', () => {
  return {
    useRouter: vi.fn().mockReturnValue(router),
  }
})

const UNIQUE_VALUES = ['ValueA', 'ValueB']
const ACTION_PROP = vi.fn()

describe('JobFiltersSidebarCheckboxGroup', () => {
  let wrapper: VueWrapper<InstanceType<typeof JobFiltersSidebarCheckboxGroup>>

  const createComponent = () => {
    wrapper = mount(JobFiltersSidebarCheckboxGroup, {
      props: {
        uniqueValues: new Set(UNIQUE_VALUES),
        action: ACTION_PROP,
      },
      global: {
        stubs: ['fa-icon'],
        plugins: [createTestingPinia({ stubActions: false })],
      },
    })
  }

  afterEach(() => {
    vi.clearAllMocks()
    wrapper.unmount()
  })

  it('renders unique list of values', async () => {
    createComponent()

    const valuesListItems = wrapper.findAll('li')
    const values = valuesListItems.map((item) => item.text())

    expect(values).toStrictEqual(UNIQUE_VALUES)
  })

  it.each(UNIQUE_VALUES)(
    "communicates that user has selected checkbox for '%s'",
    async (selectedValue) => {
      createComponent()

      const checkboxElement = wrapper.find(`#${selectedValue}`)

      await checkboxElement.setValue()

      expect(wrapper.props()['action']).toHaveBeenCalledWith([selectedValue])
    },
  )

  it('navigates user to job results page to see fresh batch of filtered jobs', async () => {
    createComponent()

    const checkboxElement = wrapper.find(`#${UNIQUE_VALUES[0]}`)

    await checkboxElement.setValue()

    expect(router.push).toHaveBeenCalledWith({ name: 'job-results' })
  })
})
