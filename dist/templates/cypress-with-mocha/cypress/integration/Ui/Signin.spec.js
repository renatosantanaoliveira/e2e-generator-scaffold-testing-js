/// <reference types="cypress" />

import Auth from '../../support/SignIn/SignInPage'
import Home from '../../support/Home/HomePage'
import {screenshot} from '../../support/utils'

describe('Login Demo QA', () =>{
    beforeEach(() => {
        cy.visit('/login')
    })

    context('Happy path', () => {
        it('Validate log-in screen', function () {
            Auth.validateLogin()
            screenshot()
        })

        it('Log in successfully', function () {
            Auth.authenticateUser()
            Home.validateMessagemWelcome()
            screenshot()
        })
    })

    context('Alternative path', () => {
        it('Log in with the wrong data', function () {
            Auth.authenticateWithDataInvalid()
            Auth.validateInvalidUserMessage()
            screenshot()
        })
    });

})