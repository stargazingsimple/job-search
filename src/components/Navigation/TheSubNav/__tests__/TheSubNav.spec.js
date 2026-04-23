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
    wrapper.unmount()
  })

  it('when user is on job results page', () => {
    createComponent()

    expect(wrapper.html()).toContain('1653')
  })

  it('does NOT display job count', () => {
    createComponent('home')

    expect(wrapper.html()).not.toContain('1653')
  })
})
