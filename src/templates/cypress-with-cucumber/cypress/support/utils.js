import { faker } from '@faker-js/faker'

class Utils {
  randomPhone() {
    return faker.phone.number()
  }

  randomPassword() {
    return faker.internet.password({ length: 10 })
  }

  randomCode(length = 6) {
    return faker.string.alphanumeric(length)
  }

  screenshot() {
    const timestamp = new Date().toISOString().replace(/[:.]/g, '-')
    cy.screenshot(timestamp)
  }
}

export default new Utils()
