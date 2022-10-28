export function inputValidation(inputValue, descriptionDefault) {
  const resultValue =
    inputValue.length === 0 ? `${descriptionDefault}` : inputValue

  return resultValue
}

const inputsRequeired = document.querySelectorAll(".required")

inputsRequeired.forEach((itemInput, position) => {
  itemInput.addEventListener("input", () => {
    if (itemInput.value.trim().length < 19 && position === 0) {
      setError(itemInput, position)
    } else if (itemInput.value.trim().length < 10 && position === 1) {
      setError(itemInput, position)
    } else if (itemInput.value.trim().length < 5 && position === 2) {
      setError(itemInput, position)
    } else if (itemInput.value.trim().length < 3 && position === 3) {
      setError(itemInput, position)
    } else {
      removeError(itemInput, position)
    }
  })
})

const messageError = document.querySelectorAll(".span-required")
function setError(valueInput, positionMessageError) {
  valueInput.style.border = "2px solid #e63636"
  messageError[positionMessageError].style.display = "block"
}
function removeError(valueInput, positionMessageError) {
  valueInput.style.border = ""
  messageError[positionMessageError].style.display = ""
}
