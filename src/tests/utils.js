export const findElementByText = (wrapper, selector, text) =>
  wrapper.findAll(selector).find((el) => el.text() === text)

export const findComponentByPropertyValue = (
  wrapper,
  componentName,
  propertyType,
  propertyName,
  propertyValue,
) =>
  wrapper
    .findAllComponents({ name: componentName })
    .find((component) => component[propertyType]()[propertyName] === propertyValue)
