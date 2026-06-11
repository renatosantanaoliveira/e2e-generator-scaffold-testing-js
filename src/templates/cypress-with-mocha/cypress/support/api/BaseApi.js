class BaseApi {
  get baseUrl() {
    return Cypress.env('apiUrl')
  }

  _request({ method, endpoint, body, headers = {}, failOnStatusCode = false, timeout }) {
    return cy.api({
      method,
      url: `${this.baseUrl}${endpoint}`,
      body,
      headers,
      failOnStatusCode,
      timeout: timeout ?? Cypress.config('responseTimeout'),
    })
  }
}

export default BaseApi
