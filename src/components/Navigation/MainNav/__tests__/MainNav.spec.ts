import { mount, type VueWrapper } from '@vue/test-utils'
import { findComponentByPropertyValue } from '@/tests/utils.ts'
import { createTestingPinia } from '@pinia/testing'
import MainNav from '@/components/Navigation/MainNav/MainNav.vue'

describe('MainNav', () => {
  let wrapper: VueWrapper<InstanceType<typeof MainNav>>

  const createComponent = () => {
    wrapper = mount(MainNav, {
      global: {
        plugins: [createTestingPinia({ stubActions: false })],
        stubs: ['fa-icon', 'router-link', 'the-sub-nav'],
      },
    })
  }

  afterEach(() => {
    wrapper.unmount()
  })

  it.each`
    text         | link
    ${'Careers'} | ${'/'}
    ${'Jobs'}    | ${'/job/results'}
    ${'Teams'}   | ${'/teams'}
  `('should render router-link component with $link link', ({ link }) => {
    createComponent()

    const routerLinkComponent = findComponentByPropertyValue(
      wrapper,
      'router-link',
      'attributes',
      'to',
      link,
    )

    expect(routerLinkComponent).toBeDefined()
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
