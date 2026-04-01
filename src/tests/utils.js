export const findElementByText = (wrapper, element, text) =>
  wrapper.findAll(element).find((el) => el.text() === text)
