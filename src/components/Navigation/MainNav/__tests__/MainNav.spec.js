import { mount } from '@vue/test-utils'
import { findComponentByPropertyValue } from '@/tests/utils.js'
import { createTestingPinia } from '@pinia/testing'
import MainNav from '@/components/Navigation/MainNav/MainNav.vue'

describe('MainNav', () => {
  let wrapper

  const createComponent = () => {
    wrapper = mount(MainNav, {
      global: {
        plugins: [createTestingPinia({ stubActions: false })],
        stubs: ['fa-icon', 'router-link'],
        mocks: {
          $route: {
            name: 'job-results',
          },
        },
      },
    })
  }

  afterEach(() => {
    vi.clearAllMocks()
    wrapper.unmount()
  })

  it.each`
    text         | link
    ${'Careers'} | ${'/'}
    ${'Jobs'}    | ${'/job/results'}
  `('should render router-link component with $link link', ({ link }) => {
    createComponent()

    const routerLinkComponent = findComponentByPropertyValue(
      wrapper,
      'router-link',
      'attributes',
      'to',
      link,
    )

    expect(routerLinkComponent.exists()).toBe(true)
  })

  it("should displays 'ProfileImage' component", async () => {
    let profileImageComponent

    createComponent()

    profileImageComponent = wrapper.findComponent({ name: 'ProfileImage' })

    expect(profileImageComponent.exists()).toBe(false)

    const actionButtonComponent = wrapper.findComponent({ name: 'BaseButton' })

    await actionButtonComponent.trigger('click')

    profileImageComponent = wrapper.findComponent({ name: 'ProfileImage' })

    expect(profileImageComponent.exists()).toBe(true)
  })
})
