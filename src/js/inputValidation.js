export function inputValidation(inputValue, descriptionDefault) {
  const resultValue =
    inputValue.length === 0 ? `${descriptionDefault}` : inputValue

  return resultValue
}
