/// <reference types="cypress" />

import { faker } from '@faker-js/faker'
import accountApi from '../../support/api/AccountApi'

describe('Account Service - /Account/v1', () => {
  context('POST /User — User creation', () => {
    it('returns 201 and a userId when creating a new user with valid credentials', () => {
      const newUser = {
        username: faker.internet.username(),
        password: 'Valid@Password1',
      }

      accountApi.createUser(newUser.username, newUser.password).then((response) => {
        expect(response.status).to.equal(201)
        expect(response.body).to.have.property('userID').and.not.be.empty
        expect(response.body.username).to.equal(newUser.username)
      })
    })

    it('returns 400 when creating a user with a password that does not meet complexity requirements', () => {
      const userWithWeakPassword = {
        username: faker.internet.username(),
        password: 'weakpassword',
      }

      accountApi.createUser(userWithWeakPassword.username, userWithWeakPassword.password).then((response) => {
        expect(response.status).to.equal(400)
        expect(response.body.message).to.contain('Passwords must have at least one non alphanumeric character')
      })
    })
  })

  context('POST /GenerateToken — Token generation', () => {
    it('returns a non-empty token when authenticating with valid credentials', () => {
      const username = Cypress.env('testUsername')
      const password = Cypress.env('testPassword')

      accountApi.generateToken(username, password).then((response) => {
        expect(response.status).to.equal(200)
        expect(response.body.token).to.be.a('string').and.not.be.empty
        expect(response.body.status).to.equal('Success')
      })
    })
  })
})
