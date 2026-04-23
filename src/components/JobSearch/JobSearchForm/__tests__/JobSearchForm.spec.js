import { flushPromises, mount } from '@vue/test-utils'
import { findComponentByPropValue } from '@/tests/utils.js'
import router from '@/router/index.js'
import JobSearchForm from '@/components/JobSearch/JobSearchForm/JobSearchForm.vue'

describe('JobSearchForm', () => {
  let wrapper

  const createComponent = () => {
    wrapper = mount(JobSearchForm, {
      global: {
        stubs: ['fa-icon'],
        plugins: [router],
      },
    })
  }

  beforeEach(() => {
    vi.useFakeTimers()
  })

  afterEach(() => {
    vi.useRealTimers()
    wrapper.unmount()
  })

  it('directs user to job results page with users search parameters', async () => {
    const spy = vi.spyOn(router, 'push')

    createComponent()

    const roleTextInputComponent = findComponentByPropValue(wrapper, 'TextInput', 'id', 'role')
    const locationTextInputComponent = findComponentByPropValue(
      wrapper,
      'TextInput',
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

    expect(spy).toHaveBeenCalledWith({
      name: 'job-results',
      query: { role: enteredRoleValue, location: enteredLocationValue },
    })
  })
})
