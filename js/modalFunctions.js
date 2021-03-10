/**
 * Module for different functions about the modals
 *
 * @module modalFunctions
 * @author Abdoulaye NDOYE <pa.ndoye@outlook.fr>
 */

import {
  updateStyle,
  modalFunding,
  modalFundingCompleted,
} from './updateDOM.js'

const body = document.querySelector('body')
const radioInputs = Array.from(
  document.querySelectorAll('.item__header__radio input[type=radio]')
)
const fundingItems = document.querySelectorAll('.item--modal')

/**
 * Function for toggling the main modal (#modal-funding)
 *
 * @function
 */
export const toggleModalFunding = () => {
  const backProjectBtn = document.querySelector('.funding__intro__action .btn')
  const fundingBtns = document.querySelectorAll('.item--main .btn')
  const modalCloseBtn = document.querySelector('.modal__header__close')

  // Open the modal in selected state
  fundingBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
      updateStyle(modalFunding, 'open', 'add')
      updateStyle(body, 'modal-opened', 'add')

      const modalItemRadio = radioInputs.find(
        (input) => input.id === btn.dataset.pledge
      )
      modalItemRadio.checked = true
      const itemToSelect = modalItemRadio.parentNode.parentNode.parentNode
      updateStyle(itemToSelect, 'selected', 'add')
    })
  })

  // Open the modal in default state
  backProjectBtn.addEventListener('click', () => {
    updateStyle(modalFunding, 'open', 'add')
    updateStyle(body, 'modal-opened', 'add')
  })

  // Close the modal when the close button was clicked
  modalCloseBtn.addEventListener('click', () => {
    updateStyle(modalFunding, 'open', 'remove')
    updateStyle(body, 'modal-opened', 'remove')
    radioInputs.forEach((input) => (input.checked = false))
    fundingItems.forEach((item) => updateStyle(item, 'selected', 'remove'))
  })

  // Close the modal when the user clicks outside of the modal
  modalFunding.addEventListener('click', (e) => {
    if (e.target.classList.contains('modal-container')) {
      updateStyle(modalFunding, 'open', 'remove')
      updateStyle(body, 'modal-opened', 'remove')
      radioInputs.forEach((input) => (input.checked = false))
      fundingItems.forEach((item) => updateStyle(item, 'selected', 'remove'))
    }
  })
}

/**
 * Function for closing the completed modal (#modal-funding-completed)
 *
 * @function
 */
export const closeModalFundingCompleted = () => {
  const completedModalBtn = document.querySelector(
    '#modal-funding-completed .btn'
  )

  completedModalBtn.addEventListener('click', () => {
    updateStyle(modalFundingCompleted, 'open', 'remove')
    updateStyle(body, 'modal-opened', 'remove')
    radioInputs.forEach((input) => (input.checked = false))
    fundingItems.forEach((item) => updateStyle(item, 'selected', 'remove'))
  })
}
