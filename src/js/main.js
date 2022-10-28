import "../css/index.css"
import { variableInputs } from "./variableInputs"
import { setCardType } from "./variableInputs"
import { variablesValueCard } from "./variableInputs"
import IMask from "imask"
import { toggleLoader } from "./loader"
import { validationForm, modal } from "./modal"
import { inputValidation } from "./inputValidation"

const { ccCardNumber, ccExpiration, ccHolder, ccSecurity } = variablesValueCard
const { cardNumber, cardHolder, expirationDate, securityCode } = variableInputs

const securityCodePattern = {
  mask: "0000",
}
const securityCodeMasked = IMask(securityCode, securityCodePattern)

const expirationDatePattern = {
  mask: "MM{/}YY",
  blocks: {
    YY: {
      mask: IMask.MaskedRange,
      from: String(new Date().getFullYear()).slice(2),
      to: String(new Date().getFullYear() + 10).slice(2),
    },
    MM: {
      mask: IMask.MaskedRange,
      from: String(new Date().getMonth() + 1),
      to: 12,
    },
  },
}
const expirationDateMasked = IMask(expirationDate, expirationDatePattern)

const cardNumberPattern = {
  mask: [
    {
      mask: "0000 0000 0000 0000",
      regex: /^4\d{0,15}/,
      cardtype: "visa",
    },
    {
      mask: "0000 0000 0000 0000",
      regex: /^(5[1-5]\d{0,2}|22[2,9]\d{0,1}|2[3-7]\d{0,2})\d{0,12}/,
      cardtype: "mastercard",
    },
    {
      mask: "0000 0000 0000 0000",
      cardtype: "default",
    },
  ],
  dispatch: function (appended, dynamicMasked) {
    const number = (dynamicMasked.value + appended).replace(/\D/g, "")
    const foundMask = dynamicMasked.compiledMasks.find((item) =>
      number.match(item.regex)
    )
    return foundMask
  },
}
const cardNumberMasked = IMask(cardNumber, cardNumberPattern)

globalThis.setCardType = setCardType

const cardHolderPattern = {
  mask: /^[A-zÀ-ú '´]+$/,
  maxLength: 31,
}
const cardHolderMasked = IMask(cardHolder, cardHolderPattern)

cardHolder.addEventListener("input", () => {
  ccHolder.innerHTML = inputValidation(cardHolder.value, "fulano da silva")
})

securityCodeMasked.on("accept", () => {
  updateSecurityCode(securityCodeMasked)
})

function updateSecurityCode(code) {
  ccSecurity.innerHTML = inputValidation(code.value, "123")
}

cardNumberMasked.on("accept", () => {
  const cardType = cardNumberMasked.masked.currentMask.cardtype
  setCardType(cardType)
  updateCardNumber(cardNumberMasked.value)
})

function updateCardNumber(cardNumber) {
  ccCardNumber.innerHTML = inputValidation(cardNumber, "1234 5678 9012 3456")
}

expirationDateMasked.on("accept", () => {
  updateExpiration(expirationDateMasked.value)
})

function updateExpiration(valueExpiration) {
  ccExpiration.innerHTML = inputValidation(valueExpiration, "02/32")
}

const form = document.querySelector("form")
form.addEventListener("submit", (event) => {
  event.preventDefault()
  toggleLoader()

  setTimeout(() => {
    toggleLoader()
    modal.showModal()
    validationForm(
      cardNumberMasked.value,
      securityCodeMasked.value,
      expirationDateMasked.value,
      cardHolderMasked.value
    )
  }, 2000)
})
