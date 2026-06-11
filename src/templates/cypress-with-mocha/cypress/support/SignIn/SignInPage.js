import { faker } from '@faker-js/faker'
import user from '../../fixtures/user.json'
import util from '../utils'
import { authElements as el } from './SignInElements'

class SignInPage {
  validateLogin() {
    cy.get(el.MENSAGEM.WELCOME).should('contain', 'Welcome')
    cy.get(el.MENSAGEM.INFORMATIVE).should('contain', 'Login in Book Store')
    cy.get(el.LOGIN.USERNAME).should('be.visible')
    cy.get(el.LOGIN.PASSWORD).should('be.visible')
    cy.get(el.LOGIN.BTN_LOGIN).should('be.visible')
  }

  _fillLoginForm(username, password) {
    cy.get(el.LOGIN.USERNAME).type(username)
    cy.get(el.LOGIN.PASSWORD).type(password)
    cy.get(el.LOGIN.BTN_LOGIN).click()
  }

  authenticateUser() {
    this._fillLoginForm(user.username, Cypress.env('testPassword'))
  }

  authenticateWithInvalidPassword() {
    this._fillLoginForm(user.username, util.getRandomPassword())
  }

  authenticateWithDataInvalid() {
    this._fillLoginForm(faker.internet.username(), util.getRandomPassword())
  }

  validateInvalidUserMessage() {
    cy.get(el.MENSAGEM.INVALID).should('contain', 'Invalid username or password!')
  }
}

export default new SignInPage()
