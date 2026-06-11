/// <reference types="cypress" />

import bookStorePage from '../../support/BookStore/BookStorePage'

describe('Book Store - DemoQA', () => {
  beforeEach(() => {
    cy.visit('/books')
  })

  context('Happy path', () => {
    it('renders the Book Store page with title, search input and books table visible', () => {
      bookStorePage.validateTitle()
      bookStorePage.validateElementsScreen()
    })

    it('filters the book list to show only matching books when searching by partial title', () => {
      const bookTitle = 'Git Pocket Guide'

      bookStorePage.inputNameBook(bookTitle)
      bookStorePage.validateNameBook(bookTitle)
    })

    it('opens the book detail page with ISBN, title and author when clicking on Git Pocket Guide', () => {
      const bookTitle = 'Git Pocket Guide'

      bookStorePage.inputNameBook(bookTitle)
      bookStorePage.clickInLinkNameBook()
      bookStorePage.validateDetailBook(bookTitle)
    })
  })

  context('Alternative path', () => {
    it('shows no results in the books table when searching for a non-existent book title', () => {
      const nonExistentBook = 'Invalid Book Title XYZ'

      bookStorePage.inputNameBook(nonExistentBook)
      bookStorePage.validateNoResults()
    })
  })
})
