/// <reference types="cypress" />

describe('Books Store service', () => {
  it('List all books', () => {
    cy.request({
      method: 'GET',
      url: 'https://bookstore.toolsqa.com/BookStore/v1/Books'
    }).then((response) => {
      expect(response.status).to.equal(200);
    })
  })

  it('Validate book name and author in book list', () => {
    cy.request({
      method: 'GET',
      url: 'https://bookstore.toolsqa.com/BookStore/v1/Books'
    }).then((response) => {
      expect(response.status).to.equal(200);
      expect(response.body.books[0].title).to.equal('Git Pocket Guide')
      expect(response.body.books[0].author).to.equal('Richard E. Silverman')
    })
  })

  it('Search to book', () => {
    cy.request({
      method: 'GET',
      url: 'https://bookstore.toolsqa.com/BookStore/v1/Book?ISBN=9781449325862'
    }).then((response) => {
      expect(response.status).to.equal(200);
      expect(response.body.title).to.equal('Git Pocket Guide')
      expect(response.body.author).to.equal('Richard E. Silverman')
    })
  })
})