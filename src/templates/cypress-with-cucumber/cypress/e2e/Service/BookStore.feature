@bookstore @api
Feature: BookStore Books API

  As an API consumer of BookStore
  I want to retrieve the list of available books
  So that I can display the book catalog to users

  @get-books
  Scenario: GET /BookStore/v1/Books returns HTTP 200 with the books collection
    When I send a GET request to the books endpoint
    Then the response status code is 200
    And the response body contains a non-empty list of books
