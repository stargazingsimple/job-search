import { mount, type MountingOptions, type VueWrapper } from '@vue/test-utils'
import { findElementByText } from '@/tests/utils.ts'
import HeaderContainer from '../HeaderContainer.vue'

describe('HeaderContainer', () => {
  let wrapper: VueWrapper<InstanceType<typeof HeaderContainer>>

  const createComponent = (slots: MountingOptions<HeaderContainer>['slots']) => {
    wrapper = mount(HeaderContainer, {
      slots,
    })
  }

  afterEach(() => {
    wrapper.unmount()
  })

  it.each`
    slotName      | slotContent   | slotWrapperElement
    ${'title'}    | ${'Title'}    | ${'h1'}
    ${'subtitle'} | ${'Subtitle'} | ${'h2'}
  `(
    'allows parent component to provide $slotName content',
    ({ slotName, slotContent, slotWrapperElement }) => {
      createComponent({
        [slotName]: `<${slotWrapperElement}>${slotContent}</${slotWrapperElement}>`,
      })

      const element = findElementByText(wrapper, slotWrapperElement, slotContent)

      expect(element).toBeDefined()
    },
  )
})
