/**
 * Module for styling the bookmark button
 *
 * @module bookmark
 * @author Abdoulaye NDOYE <pa.ndoye@outlook.fr>
 */
const bookmarkBtn = document.querySelector('.btn--bookmark')

bookmarkBtn.addEventListener('click', () =>
  bookmarkBtn.classList.toggle('booked')
)
