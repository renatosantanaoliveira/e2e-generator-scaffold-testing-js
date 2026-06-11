const BASE_PATH = '/BookStore/v1'

class BookStoreApi {
  getBooks() {
    return cy.apiRequest('GET', `${BASE_PATH}/Books`)
  }

  getBook(isbn) {
    return cy.apiRequest('GET', `${BASE_PATH}/Book?ISBN=${isbn}`)
  }

  addBooksToCollection(payload) {
    return cy.apiRequest('POST', `${BASE_PATH}/Books`, payload)
  }

  deleteBook(isbn, userId) {
    return cy.apiRequest('DELETE', `${BASE_PATH}/Book`, { isbn, userId })
  }
}

export default new BookStoreApi()
