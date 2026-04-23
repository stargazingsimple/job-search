export const findElementByText = (wrapper, selector, text) =>
  wrapper.findAll(selector).find((el) => el.text() === text)

export const findComponentByPropValue = (wrapper, componentName, propName, propValue) =>
  wrapper
    .findAllComponents({ name: componentName })
    .find((component) => component.props()[propName] === propValue)
