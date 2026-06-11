import { bookStoreElements as el } from './BookStoreElements'

class BookStorePage {
  validateTitle() {
    cy.contains('Book Store').should('be.visible')
  }

  validateElementsScreen() {
    cy.get(el.LIST.INPUT_BOOK).should('be.visible')
    cy.get(el.LIST.TABLE_BOOKS).should('be.visible')
  }

  inputNameBook(name) {
    cy.get(el.LIST.INPUT_BOOK).type(name)
  }

  validateNameBook(name) {
    cy.contains(name).should('be.visible')
  }

  validateNoResults() {
    cy.contains('Git Pocket Guide').should('not.exist')
  }

  clickInLinkNameBook() {
    cy.contains('a', 'Git Pocket Guide').click()
  }

  validateDetailBook(title) {
    cy.url().should('include', '/books')
    cy.get(el.DETAIL_BOOK.ISBN_WRAPPER).should('be.visible')
    cy.get(el.DETAIL_BOOK.BOOK_TITLE).should('be.visible')
    cy.get(el.DETAIL_BOOK.BOOK_AUTHOR).should('be.visible')
    cy.contains(title).should('be.visible')
  }
}

export default new BookStorePage()
