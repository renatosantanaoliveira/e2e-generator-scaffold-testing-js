class HomePage {
  assertProfilePageIsLoaded() {
    cy.url().should('include', '/profile')
  }
}

export default new HomePage()
