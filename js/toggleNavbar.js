/**
 * Module for showing/hiding the navbar
 *
 * @module toggleNavbar
 * @author Abdoulaye NDOYE <pa.ndoye@outlook.fr>
 */
import { updateStyle } from './updateDOM.js'

const body = document.querySelector('body')
const navbar = document.querySelector('.navbar')
const navbarMenu = document.querySelector('.navbar__menu')

navbarMenu.addEventListener('click', () => {
  updateStyle(navbar, 'open', 'toggle')
  updateStyle(body, 'no-scroll', 'toggle')
})
