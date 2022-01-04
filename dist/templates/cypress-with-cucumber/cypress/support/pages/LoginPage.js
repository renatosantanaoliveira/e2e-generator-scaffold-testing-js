import user from '../../fixtures/user.json'
import util from '../utils'

const el =  require('../elements/LoginElements').authElements
class AuthPage {
    validateLogin() {
        cy.get(el.MENSAGEM.WELCOME).should('contain', 'Welcome')
        cy.get(el.MENSAGEM.INFORMATIVE).should('contain', 'Login in Book Store')

        cy.get(el.LOGIN.USERNAME).should('be.visible')
        cy.get(el.LOGIN.PASSWORD).should('be.visible')

        cy.get(el.LOGIN.BTN_LOGIN).should('be.visible')
    }

    fastLogin(username, passwd) {
        cy.get(el.LOGIN.USERNAME).type(username)
        cy.get(el.LOGIN.PASSWORD).type(passwd)
        cy.get(el.LOGIN.BTN_LOGIN).click()
    }

    fillFieldUsername(username){
        cy.get(el.LOGIN.USERNAME).type(username)
    }

    fillFieldPassword(passwd){
        cy.get(el.LOGIN.PASSWORD).type(passwd)
    }

    clickInButtonLogin(){
        cy.get(el.LOGIN.BTN_LOGIN).click()
    }

    validateInvalidUserMessage() {
        cy.get(el.MENSAGEM.INVALID).should('contain', 'Invalid username or password!')
    }

    authenticateUser() {
        this.fastLogin(user.username, user.password)
    }

    authenticateWithPasswordInvalid() {
        this.fastLogin(user.username, util.getRandonPassword())
    }

    authenticateWithDataInvalid() {
        this.fastLogin(util.getRandomPhone(), util.getRandonPassword())
    }

}

export default new AuthPage()