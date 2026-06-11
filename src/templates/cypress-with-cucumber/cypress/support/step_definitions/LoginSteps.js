import { Given, When, Then } from '@badeball/cypress-cucumber-preprocessor'
import user from '../../fixtures/user.json'
import LoginPage from '../pages/LoginPage'
import HomePage from '../pages/HomePage'
import utils from '../utils'

Given('I am on the BookStore login page', () => {
  LoginPage.visit()
  LoginPage.assertPageIsLoaded()
})

When('I enter valid login credentials', () => {
  LoginPage.fillUsername(user.username)
  LoginPage.fillPassword(user.password)
})

When('I enter invalid login credentials', () => {
  LoginPage.fillUsername(utils.randomCode(8))
  LoginPage.fillPassword(utils.randomPassword())
})

When('I submit the login form', () => {
  LoginPage.submit()
})

Then('I am redirected to the profile page', () => {
  HomePage.assertProfilePageIsLoaded()
})

Then('I see the error message {string}', (expectedMessage) => {
  LoginPage.assertInvalidCredentialsError(expectedMessage)
})
