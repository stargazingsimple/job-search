import { mount } from '@vue/test-utils'
import { findElementByText } from '@/tests/utils.js'
import MainNav from '@/components/Navigation/MainNav/MainNav.vue'

describe('MainNav', () => {
  let wrapper

  const createComponent = () => {
    wrapper = mount(MainNav, {
      global: {
        stubs: ['fa-icon'],
      },
    })
  }

  afterEach(() => {
    wrapper.unmount()
  })

  it.each`
    text         | link
    ${'Careers'} | ${'/'}
    ${'Teams'}   | ${'/teams'}
    ${'Jobs'}    | ${'/jobs'}
  `('should render $text link with $link href attribute', ({ text, link }) => {
    createComponent()

    const linkElement = findElementByText(wrapper, 'a', text)

    expect(linkElement.attributes('href')).toBe(link)
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
