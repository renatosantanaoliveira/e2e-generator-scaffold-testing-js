const { defineConfig } = require('cypress')
const preprocessor = require("@badeball/cypress-cucumber-preprocessor");
const browserify = require("@badeball/cypress-cucumber-preprocessor/browserify");
const allureWriter = require('@shelex/cypress-allure-plugin/writer');

async function setupNodeEvents(on, config) {
  await preprocessor.addCucumberPreprocessorPlugin(on, config);

  on("file:preprocessor", browserify.default(config));
  allureWriter(on, config);

  // if version not defined, use local
  const version = config.env.version || 'qa'
  // load env from json
  config.env = require(`./cypress/config/${version}.json`);
  // change baseUrl
  config.baseUrl = config.env.baseUrl

  return config;
}

module.exports = defineConfig({
  defaultCommandTimeout: 10000,
  projectId: 'projectId',
  e2e: {
    specPattern: "**/*.feature",
    setupNodeEvents
  }
})
