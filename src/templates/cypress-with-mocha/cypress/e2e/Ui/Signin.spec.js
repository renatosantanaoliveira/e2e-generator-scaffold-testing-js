/// <reference types="cypress" />

import authPage from '../../support/SignIn/SignInPage'
import homePage from '../../support/Home/HomePage'

describe('Login - DemoQA Book Store', () => {
  beforeEach(() => {
    cy.visit('/login')
  })

  context('Happy path', () => {
    it('displays the login form with username field, password field and login button visible', () => {
      authPage.validateLogin()
    })

    it('redirects authenticated user to the Profile page on successful login', () => {
      authPage.authenticateUser()
      homePage.validateWelcomeMessage()
    })
  })

  context('Alternative path', () => {
    it('shows invalid credentials error message when logging in with a non-registered user', () => {
      authPage.authenticateWithDataInvalid()
      authPage.validateInvalidUserMessage()
    })

    it('shows invalid credentials error message when logging in with wrong password for a valid user', () => {
      authPage.authenticateWithInvalidPassword()
      authPage.validateInvalidUserMessage()
    })
  })
})
