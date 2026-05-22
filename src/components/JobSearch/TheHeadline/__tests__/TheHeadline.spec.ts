import { mount, type VueWrapper } from '@vue/test-utils'
import { findElementByText } from '@/tests/utils.ts'
import { nextTick } from 'vue'
import TheHeadline from '../TheHeadline.vue'

describe('TheHeadline', () => {
  let wrapper: VueWrapper<InstanceType<typeof TheHeadline>>

  const createComponent = () => {
    wrapper = mount(TheHeadline)
  }

  beforeEach(() => {
    vi.useFakeTimers()
  })

  afterEach(() => {
    vi.useRealTimers()
    vi.unstubAllGlobals()
    wrapper.unmount()
  })

  it('displays introductory action verb', () => {
    createComponent()

    const actionElement = findElementByText(wrapper, 'span', 'Build')

    expect(actionElement).toBeDefined()
  })

  it('changes action verb at a consistent interval', () => {
    const mock = vi.fn()

    vi.stubGlobal('setInterval', mock)

    createComponent()

    expect(mock).toHaveBeenCalled()
  })

  it('swaps action verb after interval', async () => {
    createComponent()

    vi.advanceTimersToNextTimer()

    await nextTick()

    const actionElement = findElementByText(wrapper, 'span', 'Create')

    expect(actionElement).toBeDefined()
  })

  it('removes interval when component disappears', () => {
    const mock = vi.fn()

    vi.stubGlobal('clearInterval', mock)

    createComponent()

    wrapper.unmount()

    expect(mock).toHaveBeenCalled()
  })
})
