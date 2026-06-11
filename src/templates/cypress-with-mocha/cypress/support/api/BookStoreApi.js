import BaseApi from './BaseApi'

class BookStoreApi extends BaseApi {
  getAllBooks() {
    return this._request({
      method: 'GET',
      endpoint: '/BookStore/v1/Books',
    })
  }

  getBookByISBN(isbn) {
    return this._request({
      method: 'GET',
      endpoint: `/BookStore/v1/Book?ISBN=${isbn}`,
    })
  }

  addBooksToUserCollection(userId, isbn, token) {
    return this._request({
      method: 'POST',
      endpoint: '/BookStore/v1/Books',
      body: {
        userId,
        collectionOfIsbns: [{ isbn }],
      },
      headers: { Authorization: `Bearer ${token}` },
    })
  }

  removeBookFromUserCollection(userId, isbn, token) {
    return this._request({
      method: 'DELETE',
      endpoint: '/BookStore/v1/Book',
      body: { isbn, userId },
      headers: { Authorization: `Bearer ${token}` },
    })
  }
}

export default new BookStoreApi()
