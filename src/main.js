import "./css/index.css"
import IMask from "imask"

const ccBgColor01 = document.querySelector(".cc-bg svg > g g:nth-child(1) path")
const ccBgColor02 = document.querySelector(".cc-bg svg > g g:nth-child(2) path")
const logoCard = document.querySelector(".cc-logo span:nth-child(2) img")

const securityCode = document.querySelector("#security-code")
const securityCodePattern = {
  mask: "0000",
}
const securityCodeMasked = IMask(securityCode, securityCodePattern)

const expirationDate = document.querySelector("#expiration-date")
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
      from: 1,
      to: 12,
    },
  },
}
const expirationDateMasked = IMask(expirationDate, expirationDatePattern)

const cardNumber = document.querySelector("#card-number")
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

function setCardType(typeCard = "default") {
  const cards = {
    visa: ["#2D57F2", "#436D99"],
    mastercard: ["#C69347", "#DF6F29"],
    default: ["black", "gray"],
  }
  ccBgColor01.setAttribute("fill", cards[typeCard][0])
  ccBgColor02.setAttribute("fill", cards[typeCard][1])
  logoCard.setAttribute("src", `/cc-${typeCard}.svg`)
}

globalThis.setCardType = setCardType

const addButton = document.querySelector("#add-card")
const form = document.querySelector("form")

addButton.addEventListener("click", (event) => {
  alert("Cartão Adicionado!")
})

form.addEventListener("submit", (event) => {
  event.preventDefault()
})
const cardHolder = document.querySelector("#card-holder")
const cardHolderPattern = {
  mask: /^[A-zÀ-ú '´]+$/,
}
const cardHolderMasked = IMask(cardHolder, cardHolderPattern)

cardHolder.addEventListener("input", () => {
  const ccHolder = document.querySelector(".cc-holder .value")
  ccHolder.innerHTML =
    cardHolder.value.length === 0 ? "fulano da silva" : cardHolder.value
})

securityCodeMasked.on("accept", () => {
  updateSecurityCode(securityCodeMasked)
})

function updateSecurityCode(code) {
  const ccSecurity = document.querySelector(".cc-security .value")
  ccSecurity.innerHTML = code.value.length === 0 ? "123" : code.value
}

cardNumberMasked.on("accept", () => {
  const cardType = cardNumberMasked.masked.currentMask.cardtype
  setCardType(cardType)
  updateCardNumber(cardNumberMasked.value)
})

function updateCardNumber(cardNumber) {
  const ccCardNumber = document.querySelector(".cc-info .cc-number")
  ccCardNumber.innerHTML =
    cardNumber.length === 0 ? "1234 5678 9012 3456" : cardNumber
}

expirationDateMasked.on("accept", () => {
  updateExpiration(expirationDateMasked.value)
})

function updateExpiration(valueExpiration) {
  const ccExpiration = document.querySelector(".cc-expiration .value")
  ccExpiration.innerHTML =
    valueExpiration.length === 0 ? "02/32" : valueExpiration
}
