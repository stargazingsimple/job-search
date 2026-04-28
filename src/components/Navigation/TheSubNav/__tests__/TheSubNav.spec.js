import { mount } from '@vue/test-utils'
import TheSubNav from '@/components/Navigation/TheSubNav/TheSubNav.vue'

describe('TheSubNav', () => {
  let wrapper

  const createComponent = (routeName = 'job-results') => {
    wrapper = mount(TheSubNav, {
      global: {
        mocks: {
          $route: {
            name: routeName,
          },
        },
        stubs: ['fa-icon'],
      },
    })
  }

  afterEach(() => {
    vi.clearAllMocks()
    wrapper.unmount()
  })

  it('when user is on job results page', () => {
    createComponent()

    const jobCountElement = wrapper.find('[data-test="job-count"]')

    expect(jobCountElement.text()).toBe('1653')
  })

  it('does NOT display job count', () => {
    createComponent('home')

    const jobCountElement = wrapper.find('[data-test="job-count"]')

    expect(jobCountElement.exists()).toBe(false)
  })
})
