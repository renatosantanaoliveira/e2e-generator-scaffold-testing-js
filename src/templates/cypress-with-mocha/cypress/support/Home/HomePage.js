import { homeElements as el } from './HomeElements'

class HomePage {
  validateWelcomeMessage() {
    cy.url().should('include', el.HOME.PROFILE_URL_FRAGMENT)
  }
}

export default new HomePage()
