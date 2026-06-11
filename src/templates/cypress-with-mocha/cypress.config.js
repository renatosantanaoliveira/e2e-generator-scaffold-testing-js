const { defineConfig } = require('cypress')
const allureWriter = require('@shelex/cypress-allure-plugin/writer')

function setupNodeEvents(on, config) {
  // Load environment config first so allureWriter reads the correct env flags (e.g. allure: "true")
  const version = config.env.version || 'qa'
  const envFromFile = require(`./cypress/config/${version}.json`)
  config.env = { ...config.env, ...envFromFile }
  config.baseUrl = config.env.baseUrl

  // allureWriter only applies in headless mode (cypress run).
  // config.isTextTerminal is true in run mode, false in cypress open.
  if (config.isTextTerminal) {
    allureWriter(on, config)
  }

  return config
}

module.exports = defineConfig({
  viewportWidth: 1280,
  viewportHeight: 720,
  projectId: 'projectId',
  requestTimeout: 10000,
  responseTimeout: 30000,
  retries: {
    runMode: 1,
    openMode: 0,
  },
  // Cypress 15: Cypress.env() shows a deprecation warning unless acknowledged here.
  // cy.env() is the future API — migrate when it stabilises in a minor release.
  allowCypressEnv: true,
  env: {
    hideCredentials: true,
  },
  e2e: {
    specPattern: 'cypress/e2e/**/*.spec.{js,ts}',
    setupNodeEvents,
  },
})
