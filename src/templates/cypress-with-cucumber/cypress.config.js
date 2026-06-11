const { defineConfig } = require('cypress')
const createBundler = require('@bahmutov/cypress-esbuild-preprocessor')
const { addCucumberPreprocessorPlugin } = require('@badeball/cypress-cucumber-preprocessor')
const createEsbuildPlugin = require('@badeball/cypress-cucumber-preprocessor/esbuild')
const allureWriter = require('@shelex/cypress-allure-plugin/writer')

async function setupNodeEvents(on, config) {
  // Load environment config first so plugins (e.g. allure) read the correct env flags
  const version = config.env.version || 'qa'
  config.env = require(`./cypress/config/${version}.json`)
  config.baseUrl = config.env.baseUrl

  await addCucumberPreprocessorPlugin(on, config)

  on('file:preprocessor', createBundler({
    plugins: [createEsbuildPlugin.default(config)]
  }))

  // allureWriter only applies in headless mode (cypress run).
  // config.isTextTerminal is true in run mode, false in open mode.
  // This mirrors the conditional in support/e2e.js that uses Cypress.config('isInteractive').
  if (config.isTextTerminal) {
    allureWriter(on, config)
  }

  return config
}

module.exports = defineConfig({
  defaultCommandTimeout: 10000,
  projectId: 'projectId',
  e2e: {
    specPattern: '**/*.feature',
    setupNodeEvents
  }
})
