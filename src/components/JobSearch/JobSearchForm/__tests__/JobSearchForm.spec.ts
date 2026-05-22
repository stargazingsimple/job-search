import { flushPromises, mount, type VueWrapper } from '@vue/test-utils'
import { findComponentByPropertyValue } from '@/tests/utils.ts'
import JobSearchForm from '@/components/JobSearch/JobSearchForm/JobSearchForm.vue'

const { router } = vi.hoisted(() => {
  return {
    router: { push: vi.fn() },
  }
})

vi.mock('vue-router', () => {
  return {
    useRouter: vi.fn().mockReturnValue(router),
  }
})

describe('JobSearchForm', () => {
  let wrapper: VueWrapper<InstanceType<typeof JobSearchForm>>

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
    vi.clearAllMocks()
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

    expect(roleTextInputComponent).toBeDefined()
    expect(locationTextInputComponent).toBeDefined()

    const enteredRoleValue = 'Frontend'
    const enteredLocationValue = 'Los Angeles'

    await roleTextInputComponent!.setValue(enteredRoleValue)
    await locationTextInputComponent!.setValue(enteredLocationValue)
    await formElement.trigger('submit.prevent')

    vi.runAllTimers()
    await flushPromises()

    expect(router.push).toHaveBeenCalledWith({
      name: 'job-results',
      query: { role: enteredRoleValue, location: enteredLocationValue },
    })
  })
})
