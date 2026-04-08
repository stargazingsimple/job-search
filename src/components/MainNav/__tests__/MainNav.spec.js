import { mount } from '@vue/test-utils'
import { findElementByText } from '@/tests/utils.js'
import MainNav from '@/components/MainNav/MainNav.vue'

describe('MainNav', () => {
  let wrapper

  const createComponent = () => {
    wrapper = mount(MainNav)
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
})
