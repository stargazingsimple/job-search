import { flushPromises, mount } from '@vue/test-utils'
import { findComponentByPropertyValue } from '@/tests/utils.js'
import JobSearchForm from '@/components/JobSearch/JobSearchForm/JobSearchForm.vue'

const { push } = vi.hoisted(() => {
  return {
    push: vi.fn(),
  }
})

vi.mock('vue-router', () => {
  return {
    useRouter: vi.fn().mockReturnValue({ push }),
  }
})

describe('JobSearchForm', () => {
  let wrapper

  const createComponent = () => {
    wrapper = mount(JobSearchForm, {
      global: {
        stubs: ['fa-icon'],
      },
    })
  }

  beforeEach(() => {
    vi.useFakeTimers()
  })

  afterEach(() => {
    vi.useRealTimers()
    vi.resetAllMocks()
    wrapper.unmount()
  })

  it('directs user to job results page with users search parameters', async () => {
    createComponent()

    const roleTextInputComponent = findComponentByPropertyValue(
      wrapper,
      'TextInput',
      'props',
      'id',
      'role',
    )
    const locationTextInputComponent = findComponentByPropertyValue(
      wrapper,
      'TextInput',
      'props',
      'id',
      'location',
    )
    const formElement = wrapper.find('form')

    const enteredRoleValue = 'Frontend'
    const enteredLocationValue = 'Los Angeles'

    await roleTextInputComponent.setValue(enteredRoleValue)
    await locationTextInputComponent.setValue(enteredLocationValue)
    await formElement.trigger('submit.prevent')

    vi.runAllTimers()
    await flushPromises()

    expect(push).toHaveBeenCalledWith({
      name: 'job-results',
      query: { role: enteredRoleValue, location: enteredLocationValue },
    })
  })
})
