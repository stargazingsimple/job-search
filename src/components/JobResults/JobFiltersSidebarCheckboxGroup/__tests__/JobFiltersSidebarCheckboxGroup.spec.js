import { mount } from '@vue/test-utils'
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

const HEADER_PROP = 'Some header'
const UNIQUE_VALUES = ['ValueA', 'ValueB']
const ACTION_PROP = vi.fn()

describe('JobFiltersSidebarCheckboxGroup', () => {
  let wrapper

  const createComponent = () => {
    wrapper = mount(JobFiltersSidebarCheckboxGroup, {
      props: {
        header: HEADER_PROP,
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

    const headerElement = wrapper.find('[data-test="header"]')

    await headerElement.trigger('click')

    const valuesListItems = wrapper.findAll('li')
    const values = valuesListItems.map((item) => item.text())

    expect(values).toStrictEqual(UNIQUE_VALUES)
  })

  it.each(UNIQUE_VALUES)(
    "communicates that user has selected checkbox for '%s'",
    async (selectedValue) => {
      createComponent()

      const headerElement = wrapper.find('[data-test="header"]')

      await headerElement.trigger('click')

      const checkboxElement = wrapper.find(`#${selectedValue}`)

      await checkboxElement.setValue()

      expect(wrapper.props()['action']).toHaveBeenCalledWith([selectedValue])
    },
  )

  it('navigates user to job results page to see fresh batch of filtered jobs', async () => {
    createComponent()

    const headerElement = wrapper.find('[data-test="header"]')

    await headerElement.trigger('click')

    const checkboxElement = wrapper.find(`#${UNIQUE_VALUES[0]}`)

    await checkboxElement.setValue()

    expect(router.push).toHaveBeenCalledWith({ name: 'job-results' })
  })
})
