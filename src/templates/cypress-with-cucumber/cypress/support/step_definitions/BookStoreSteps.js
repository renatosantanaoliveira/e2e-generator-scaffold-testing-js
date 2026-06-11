import { When, Then } from '@badeball/cypress-cucumber-preprocessor'
import BookStoreApi from '../api/BookStoreApi'

let booksResponse

When('I send a GET request to the books endpoint', () => {
  BookStoreApi.getBooks().then((response) => {
    booksResponse = response
  })
})

Then('the response status code is {int}', (expectedStatus) => {
  expect(booksResponse.status).to.equal(expectedStatus)
})

Then('the response body contains a non-empty list of books', () => {
  expect(booksResponse.body).to.not.be.empty
  expect(booksResponse.body.books).to.be.an('array').that.is.not.empty
})
