/// <reference types="cypress" />

describe('Account service', () => {
  var faker = require('faker');
  it('Add new user', () => {
    var user = {
      "userName": faker.name.firstName(),
      "password": "5eVTz*DZsLmp"
    }

    cy.request({
      method: 'POST',
      url: 'https://bookstore.toolsqa.com/Account/v1/User',
      body: user
    }).then((response) => {
      expect(response.status).to.equal(201);
    })
  })
})