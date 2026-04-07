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

  it("should render Careers link with '/' href attribute", () => {
    createComponent()

    const linkElement = findElementByText(wrapper, 'a', 'Careers')

    expect(linkElement.attributes('href')).toBe('/')
  })
})
