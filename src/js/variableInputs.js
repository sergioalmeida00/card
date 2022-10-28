export const variableInputs = {
  cardNumber: document.querySelector("#card-number"),
  cardHolder: document.querySelector("#card-holder"),
  expirationDate: document.querySelector("#expiration-date"),
  securityCode: document.querySelector("#security-code"),
}

export const resetForm = () => {
  variableInputs.cardNumber.value = ""
  variableInputs.cardHolder.value = ""
  variableInputs.expirationDate.value = ""
  variableInputs.securityCode.value = ""
}

export function setCardType(typeCard = "default") {
  const ccBgColor01 = document.querySelector(
    ".cc-bg svg > g g:nth-child(1) path"
  )
  const ccBgColor02 = document.querySelector(
    ".cc-bg svg > g g:nth-child(2) path"
  )
  const logoCard = document.querySelector(".cc-logo span:nth-child(2) img")

  const cards = {
    visa: ["#2D57F2", "#436D99"],
    mastercard: ["#C69347", "#DF6F29"],
    default: ["black", "gray"],
  }
  ccBgColor01.setAttribute("fill", cards[typeCard][0])
  ccBgColor02.setAttribute("fill", cards[typeCard][1])
  logoCard.setAttribute("src", `/cc-${typeCard}.svg`)
}
export const variablesValueCard = {
  ccHolder: document.querySelector(".cc-holder .value"),
  ccSecurity: document.querySelector(".cc-security .value"),
  ccCardNumber: document.querySelector(".cc-info .cc-number"),
  ccExpiration: document.querySelector(".cc-expiration .value"),
}

export const resetCard = function () {
  variablesValueCard.ccHolder.innerText = "NOME DO TITULAR"
  variablesValueCard.ccSecurity.innerText = "123"
  variablesValueCard.ccCardNumber.innerText = "1234 5678 9012 3456"
  variablesValueCard.ccExpiration.innerText = "02/29"

  setCardType()
}
