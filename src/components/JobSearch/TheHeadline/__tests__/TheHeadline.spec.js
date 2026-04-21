import { mount } from '@vue/test-utils'
import { findElementByText } from '@/tests/utils.js'
import { nextTick } from 'vue'
import TheHeadline from '../TheHeadline.vue'

describe('TheHeadline', () => {
  let wrapper

  const createComponent = () => {
    wrapper = mount(TheHeadline)
  }

  beforeEach(() => {
    vi.useFakeTimers()
  })

  afterEach(() => {
    vi.useRealTimers()
    vi.resetAllMocks()
    wrapper.unmount()
  })

  it('displays introductory action verb', () => {
    createComponent()

    const actionElement = findElementByText(wrapper, 'span', 'Build')

    expect(actionElement.exists()).toBe(true)
  })

  it('changes action verb at a consistent interval', () => {
    const spy = vi.spyOn(window, 'setInterval')

    createComponent()

    expect(spy).toHaveBeenCalled()
  })

  it('swaps action verb after interval', async () => {
    createComponent()

    vi.advanceTimersToNextTimer()

    await nextTick()

    const actionElement = findElementByText(wrapper, 'span', 'Create')

    expect(actionElement.exists()).toBe(true)
  })

  it('removes interval when component disappears', () => {
    const spy = vi.spyOn(window, 'clearInterval')

    createComponent()

    wrapper.unmount()

    expect(spy).toHaveBeenCalled()
  })
})
