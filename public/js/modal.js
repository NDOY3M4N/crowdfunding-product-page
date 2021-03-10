/**
 * Module for various operations about the modal
 *
 * @module modal
 * @author Abdoulaye NDOYE <pa.ndoye@outlook.fr>
 */

import {
  updateStyle,
  updateStatsNumber,
  updateProgressBar,
  updateStock,
} from './updateDOM.js'

import { toggleModalFunding } from './modalFunctions.js'

// open/close the main modal
toggleModalFunding()

// Change the style of the selected item
const fundingItems = document.querySelectorAll('.item--modal')
const radioInputs = document.querySelectorAll('.item__header__radio input')

radioInputs.forEach((input) => {
  input.checked = false

  input.addEventListener('change', (e) => {
    fundingItems.forEach((item) => updateStyle(item, 'selected', 'remove'))
    const itemModal = e.target.parentNode.parentNode.parentNode
    updateStyle(itemModal, 'selected', 'add')
  })
})

// Modal actions
const totalBacked = document.querySelector(
  '.funding__stats__numbers__money .value'
)
const totalBackedValue = parseInt(totalBacked.innerText.replace(',', ''))
const totalBackers = document.querySelector(
  '.funding__stats__numbers__backers h1'
)
const totalBackersValue = parseInt(totalBackers.innerText.replace(',', ''))

const oldValues = {
  backed: null,
  backers: null,
}

const itemModalActions = document.querySelectorAll('.item__footer__action')
itemModalActions.forEach((action) => {
  action.addEventListener('submit', (e) => {
    e.preventDefault()
    const inputForm = action.pledgeMoney

    if (inputForm) {
      const inputValue = +inputForm.value

      if (!oldValues.backers) oldValues.backers = totalBackersValue + 1
      else oldValues.backers += 1

      if (!oldValues.backed) oldValues.backed = totalBackedValue + inputValue
      else oldValues.backed += inputValue

      updateStatsNumber(totalBacked, oldValues.backed)
      updateStatsNumber(totalBackers, oldValues.backers)

      // Update the stock
      updateStock(inputForm)

      // Reset the form
      action.reset()
    } else {
      if (!oldValues.backers) oldValues.backers = totalBackersValue + 1
      else oldValues.backers += 1

      updateStatsNumber(totalBackers, oldValues.backers)
    }

    // Finally we update the progress bar
    updateProgressBar(oldValues.backed ?? totalBackedValue)
  })
})
