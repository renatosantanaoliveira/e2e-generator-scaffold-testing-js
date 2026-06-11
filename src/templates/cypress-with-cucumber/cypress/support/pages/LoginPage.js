const sel = {
  username: '#userName',
  password: '#password',
  btnLogin: '#login',
  welcomeHeading: 'h2',
  informativeHeading: 'h5',
  invalidCredentialsMessage: '#name'
}

class LoginPage {
  visit() {
    cy.visit('/login')
  }

  assertPageIsLoaded() {
    cy.get(sel.welcomeHeading).should('contain', 'Welcome')
    cy.get(sel.informativeHeading).should('contain', 'Login in Book Store')
    cy.get(sel.username).should('be.visible')
    cy.get(sel.password).should('be.visible')
    cy.get(sel.btnLogin).should('be.visible')
  }

  fillUsername(username) {
    cy.get(sel.username).type(username)
  }

  fillPassword(password) {
    cy.get(sel.password).type(password)
  }

  submit() {
    cy.get(sel.btnLogin).click()
  }

  assertInvalidCredentialsError(message = 'Invalid username or password!') {
    cy.get(sel.invalidCredentialsMessage).should('contain', message)
  }
}

export default new LoginPage()
