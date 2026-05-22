import type { VueWrapper } from '@vue/test-utils'

export const findElementByText = (wrapper: VueWrapper, selector: string, text: string) =>
  wrapper.findAll(selector).find((el) => el.text() === text)

export const findComponentByPropertyValue = (
  wrapper: VueWrapper,
  componentName: string,
  propertyType: 'props' | 'attributes',
  propertyName: string,
  propertyValue: string,
) =>
  wrapper
    .findAllComponents({ name: componentName })
    .find((component) => component[propertyType]()[propertyName] === propertyValue)
