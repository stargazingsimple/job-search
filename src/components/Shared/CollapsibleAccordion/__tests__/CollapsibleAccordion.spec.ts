import { mount, type VueWrapper } from '@vue/test-utils'
import { findElementByText } from '@/tests/utils.ts'
import CollapsibleAccordion from '../CollapsibleAccordion.vue'

describe('CollapsibleAccordion', () => {
  let wrapper: VueWrapper<InstanceType<typeof CollapsibleAccordion>>

  const createComponent = (defaultSlot: string) => {
    wrapper = mount(CollapsibleAccordion, {
      props: {
        header: 'Header',
      },
      slots: {
        default: defaultSlot,
      },
      global: {
        stubs: ['fa-icon'],
      },
    })
  }

  afterEach(() => {
    wrapper.unmount()
  })

  it.each`
    defaultSlot                   | textContent
    ${''}                         | ${'Whoops, somebody forgot to populate me!'}
    ${'<h3>My nested child</h3>'} | ${'My nested child'}
  `('renders child content with text $textContent', async ({ defaultSlot, textContent }) => {
    createComponent(defaultSlot)

    let childElement

    childElement = findElementByText(wrapper, 'h3', textContent)

    expect(childElement).toBeUndefined()

    const headerElement = wrapper.find('[data-test="header"]')

    await headerElement.trigger('click')

    childElement = findElementByText(wrapper, 'h3', textContent)

    expect(childElement).toBeDefined()
  })
})
