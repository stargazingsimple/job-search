import { mount } from '@vue/test-utils'
import TextInput from '@/components/Shared/TextInput/TextInput.vue'

const MODEL_VALUE_PROP = 'Frontend'
const ID_PROP = 'role'
const PLACEHOLDER_PROP = 'Placeholder'
const LABEL_PROP = 'Label'
const ERROR_MESSAGE_PROP = 'Invalid value'

describe('TextInput', () => {
  let wrapper

  const createComponent = () => {
    wrapper = mount(TextInput, {
      props: {
        modelValue: MODEL_VALUE_PROP,
        id: ID_PROP,
        placeholder: PLACEHOLDER_PROP,
        label: LABEL_PROP,
      },
    })
  }

  afterEach(() => {
    wrapper.unmount()
  })

  it.each`
    attribute        | propValue           | element
    ${'value'}       | ${MODEL_VALUE_PROP} | ${'input'}
    ${'id'}          | ${ID_PROP}          | ${'input'}
    ${'placeholder'} | ${PLACEHOLDER_PROP} | ${'input'}
    ${'for'}         | ${ID_PROP}          | ${'label'}
  `(
    'sets correct $attribute attribute on $element element',
    ({ attribute, propValue, element }) => {
      createComponent()

      const expectedElement = wrapper.find(element)

      expect(expectedElement.attributes(attribute)).toBe(propValue)
    },
  )

  it('renders label text', () => {
    createComponent()

    const labelElement = wrapper.find('label')

    expect(labelElement.text()).toBe(LABEL_PROP)
  })

  it('renders validation error message', async () => {
    let errorMessageElement

    createComponent()

    errorMessageElement = wrapper.find('[data-test="error-message"]')

    expect(errorMessageElement.exists()).toBe(false)

    await wrapper.setProps({
      errorMessage: ERROR_MESSAGE_PROP,
    })

    errorMessageElement = wrapper.find('[data-test="error-message"]')

    expect(errorMessageElement.text()).toBe(ERROR_MESSAGE_PROP)
  })

  it("emits 'update:modelValue' event", async () => {
    createComponent()

    const inputElement = wrapper.find('input')
    const enteredValue = 'test'

    await inputElement.setValue(enteredValue)

    expect(wrapper.emitted('update:modelValue')[0][0]).toBe(enteredValue)
  })
})
