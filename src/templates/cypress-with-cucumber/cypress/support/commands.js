import user from '../fixtures/user.json'

Cypress.Commands.add('loginAs', (username = user.username, password = user.password) => {
  cy.visit('/login')
  cy.get('#userName').type(username)
  cy.get('#password').type(password)
  cy.get('#login').click()
})

Cypress.Commands.add('apiRequest', (method, path, body = null) => {
  return cy.api({
    method,
    url: `${Cypress.env('apiBaseUrl')}${path}`,
    body,
    failOnStatusCode: false
  })
})
