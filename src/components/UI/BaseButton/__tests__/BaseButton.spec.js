import { mount } from '@vue/test-utils'
import { findElementByText } from '@/tests/utils.js'
import BaseButton from '@/components/UI/BaseButton/BaseButton.vue'

const TEXT_PROP = 'Click me'
const TYPE_PROP = 'secondary'

describe('BaseButton', () => {
  let wrapper

  const createComponent = () => {
    wrapper = mount(BaseButton, {
      props: {
        text: TEXT_PROP,
        type: TYPE_PROP,
      },
    })
  }

  afterEach(() => {
    wrapper.unmount()
  })

  it('renders text', () => {
    createComponent()

    const buttonElement = findElementByText(wrapper, 'button', TEXT_PROP)

    expect(buttonElement.exists()).toBe(true)
  })

  it('applies one of several styles to button', () => {
    createComponent()

    const buttonElement = findElementByText(wrapper, 'button', TEXT_PROP)

    expect(buttonElement.classes(TYPE_PROP)).toBe(true)
  })
})
