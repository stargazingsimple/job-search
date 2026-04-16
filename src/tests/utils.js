export const findElementByText = (wrapper, selector, text) =>
  wrapper.findAll(selector).find((el) => el.text() === text)
