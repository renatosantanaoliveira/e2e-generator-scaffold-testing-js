/* global Given, Then, When */
/// <reference types="cypress" />

let response

Given("I execute a GET in BookStore", () => {
    cy.request({
        method: 'GET',
        url: 'https://bookstore.toolsqa.com/BookStore/v1/Books'
    }).then(($res) => {
        response = $res
    })
})

Then("return the booklist be successfully", () => {
    expect(response.status).to.equal(200);
    expect(response.body).to.be.not.empty
})