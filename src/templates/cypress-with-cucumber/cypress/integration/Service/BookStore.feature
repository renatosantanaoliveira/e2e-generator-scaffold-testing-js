@store
Feature: Book Store

    I as a user of the bookstore
    I want to use API to search books in the store

    @search
    Scenario: Listing the books
        Given I execute a GET in BookStore
        Then return the booklist be successfully