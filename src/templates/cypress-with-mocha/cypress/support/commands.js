// Programmatic login via API — bypasses UI login to speed up tests that
// need an authenticated session as a precondition, not as the subject under test.
Cypress.Commands.add('loginViaApi', (username, password) => {
  cy.api({
    method: 'POST',
    url: `${Cypress.env('apiUrl')}/Account/v1/GenerateToken`,
    body: { userName: username, password },
    failOnStatusCode: false,
  }).then((response) => {
    if (response.body.token) {
      window.localStorage.setItem('userInfo', JSON.stringify({
        userName: username,
        token: response.body.token,
        expires: response.body.expires,
        created: response.body.created,
        isAuthenticated: true,
      }))
    }
  })
})
