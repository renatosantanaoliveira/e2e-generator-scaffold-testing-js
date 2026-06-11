/// <reference types="cypress" />

import bookStoreApi from '../../support/api/BookStoreApi'

describe('BookStore Service - /BookStore/v1', () => {
  context('GET /Books — Book catalog listing', () => {
    it('returns 200 and a non-empty books array when retrieving all available books', () => {
      bookStoreApi.getAllBooks().then((response) => {
        expect(response.status).to.equal(200)
        expect(response.body.books).to.be.an('array').and.not.be.empty
      })
    })

    it('has Git Pocket Guide by Richard E. Silverman as the first book in the catalog', () => {
      bookStoreApi.getAllBooks().then((response) => {
        const firstBook = response.body.books[0]

        expect(response.status).to.equal(200)
        expect(firstBook.title).to.equal('Git Pocket Guide')
        expect(firstBook.author).to.equal('Richard E. Silverman')
      })
    })
  })

  context('GET /Book — Book lookup by ISBN', () => {
    it('returns 200 with full book details when searching Git Pocket Guide by its ISBN', () => {
      const gitPocketGuideISBN = '9781449325862'

      bookStoreApi.getBookByISBN(gitPocketGuideISBN).then((response) => {
        expect(response.status).to.equal(200)
        expect(response.body.title).to.equal('Git Pocket Guide')
        expect(response.body.author).to.equal('Richard E. Silverman')
        expect(response.body.isbn).to.equal(gitPocketGuideISBN)
      })
    })

    it('returns 400 when searching with an ISBN that does not exist in the catalog', () => {
      const nonExistentISBN = '9999999999999'

      bookStoreApi.getBookByISBN(nonExistentISBN).then((response) => {
        expect(response.status).to.equal(400)
        expect(response.body.message).to.equal('ISBN supplied is not available in Books Collection!')
      })
    })
  })
})
