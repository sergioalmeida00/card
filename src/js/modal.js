import { resetForm } from "./variableInputs"
import { resetCard } from "./variableInputs"

export const modal = document.querySelector("dialog")
modal.addEventListener("click", () => {
  modal.close()
})

export function validationForm(
  cardNumberMasked,
  securityCodeMasked,
  expirationDateMasked,
  cardHolderMasked
) {
  if (
    cardNumberMasked.length < 16 ||
    securityCodeMasked.length < 3 ||
    expirationDateMasked.length < 5 ||
    cardHolderMasked.length === 0
  ) {
    infoDialogModal(
      "Falha no Cadastro",
      "Todos os campos precisam ser preenchidos",
      "/erro.svg"
    )
  } else {
    infoDialogModal(
      "Cadastrado com Sucesso",
      `Olá, <strong>${cardHolderMasked}</strong> sua solicitação foi realizada com sucesso!`,
      "/success.svg"
    )
    resetForm()
    resetCard()
  }
}

function infoDialogModal(title, description, img) {
  const dialogTitle = document.querySelector(".dialog h3")
  const dialogDescription = document.querySelector(".dialog .description p")
  const imgDialog = document.querySelector(".dialog .description img")

  dialogTitle.innerHTML = title
  dialogDescription.innerHTML = description
  imgDialog.setAttribute("src", `${img}`)
}
