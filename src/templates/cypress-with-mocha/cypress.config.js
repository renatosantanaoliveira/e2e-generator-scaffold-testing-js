const { defineConfig } = require('cypress')
const allureWriter = require('@shelex/cypress-allure-plugin/writer')

module.exports = defineConfig({
  viewportWidth: 1024,
  viewportHeight: 800,
  specPattern: 'cypress/e2e/**/*.{js,jsx,ts,tsx}',
  projectId: 'projectId',
  e2e: {
    setupNodeEvents(on, config) {
      allureWriter(on, config)

      // if version not defined, use local
      const version = config.env.version || 'qa'
      // load env from json
      config.env = require(`./cypress/config/${version}.json`);
      // change baseUrl
      config.baseUrl = config.env.baseUrl

      return config
    },
  },
})
