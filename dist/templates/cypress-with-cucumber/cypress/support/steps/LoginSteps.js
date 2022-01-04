/* global Given, Then, When */

import Auth from '../pages/LoginPage'
import Home from '../pages/HomePage'
import user from '../../fixtures/user.json'
import screen from '../utils'

Given("that I am on the login page", () => {
    cy.visit('/login')
    screen.screenshot()
})

When("I input username and password", () => {
    Auth.fillFieldUsername(user.username)
    Auth.fillFieldPassword(user.password)
    screen.screenshot()
})

And("click in button {string}", () => {
    Auth.clickInButtonLogin()
})

Then("log-in will be successfully", () => {
    Home.validateMessagemWelcome()
    screen.screenshot()
})

When("I input username and password invalid", () => {
    Auth.authenticateWithDataInvalid()
    screen.screenshot()
})

Then("return message error on screen", () => {
    Auth.validateInvalidUserMessage()
    screen.screenshot()
})
