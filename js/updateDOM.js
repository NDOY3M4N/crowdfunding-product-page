/**
 * Module for updating different element of the DOM
 *
 * @module updateDOM
 * @author Abdoulaye NDOYE <pa.ndoye@outlook.fr>
 */

import { closeModalFundingCompleted } from './modalFunctions.js'

/** @type {HTMLElement} The modal for completed funding */
export const modalFundingCompleted = document.querySelector(
  '#modal-funding-completed'
)

/** @type {HTMLElement} The modal for funding */
export const modalFunding = document.querySelector('#modal-funding')

/**
 * Function for adding/removing a class
 * to an element of the DOM
 *
 * @function
 * @param {HTMLElement} selector The HTML element we want to update
 * @param {string} style The CSS style to add/remove to the element
 * @param {string} action The action to perform (add or remove)
 */
export const updateStyle = (selector, style, action) => {
  switch (action) {
    case 'add':
      selector.classList.add(style)
      break
    case 'remove':
      selector.classList.remove(style)
      break
    case 'toggle':
      selector.classList.toggle(style)
      break
    default:
      return
  }
}

/**
 * Function for updating the stats on the DOM
 * and then opening the modal-completed
 *
 * @function
 * @param {HTMLElement} selector The HTML element we want to update
 * @param {Number} value The old stats we want to change
 */
export const updateStatsNumber = (selector, value) => {
  selector.innerHTML = formatNumber(value)

  // After updating the stats, we open the modal-completed
  updateStyle(modalFunding, 'open', 'remove')
  updateStyle(modalFundingCompleted, 'open', 'add')
  // We now close the modal-completed after finisihing
  closeModalFundingCompleted()
}

/**
 * Function for updating the stock
 *
 * @function
 * @param {HTMLElement} checkoutInput The container for the input checkout
 */
export const updateStock = (checkoutInput) => {
  const itemsMainStock = document.querySelectorAll(
    '.item--main .item__footer__stock h1'
  )
  const itemsModalStock = document.querySelectorAll(
    '.item--modal .item__footer__stock h1'
  )

  const stocks = [
    {
      name: 'bamboo-stand',
      mainDOM: itemsMainStock[0],
      modalDOM: itemsModalStock[0],
    },
    {
      name: 'black-edition-stand',
      mainDOM: itemsMainStock[1],
      modalDOM: itemsModalStock[1],
    },
    {
      name: 'mahogany-stand',
      mainDOM: itemsMainStock[2],
      modalDOM: itemsModalStock[2],
    },
  ]

  // Update the stock
  const stockSelected = stocks.find(
    (stock) => stock.name === checkoutInput.dataset.item
  )
  stockSelected.mainDOM.innerText = +stockSelected.mainDOM.innerText - 1
  stockSelected.modalDOM.innerText = +stockSelected.modalDOM.innerText - 1

  // Check if the stock is empty
  stocks.map((stock) => {
    if (+stock.mainDOM.innerText <= 0) {
      const mainItem = stock.mainDOM.parentNode.parentNode.parentNode
      const modalItem = stock.modalDOM.parentNode.parentNode.parentNode

      updateStyle(mainItem, 'out-of-stock', 'add')
      updateStyle(modalItem, 'out-of-stock', 'add')

      mainItem.querySelector('.item__footer .btn').innerText = 'Out of stock'
    }
  })
}

/**
 * Function for updating the progress bar
 *
 * @param {Number} value The amount backed so far
 */
const progressBar = document.querySelector('.funding__stats__progress')
export const updateProgressBar = (value) => {
  const newPercentage = (value / 100000) * 100

  progressBar.style.setProperty('--percentage', `${newPercentage}%`)
}

/**
 * Helper function for formatting number
 * exple: 89914 -> 89,914
 *
 * @param {Number} number The number to format
 * @returns {Number}
 */
const formatNumber = (number) => new Intl.NumberFormat().format(number)
