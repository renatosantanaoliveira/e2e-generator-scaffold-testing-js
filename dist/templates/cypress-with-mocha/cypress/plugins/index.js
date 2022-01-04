/// <reference types="cypress" />
// ***********************************************************
// This example plugins/index.js can be used to load plugins
//
// You can change the location of this file or turn off loading
// the plugins file with the 'pluginsFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/plugins-guide
// ***********************************************************

// This function is called when a project is opened or re-opened (e.g. due to
// the project's config changing)

/**
 * @type {Cypress.PluginConfig}
 */
const allureWriter = require('@shelex/cypress-allure-plugin/writer')

module.exports = (on, config) => {
    allureWriter(on, config)

    // if version not defined, use local
    const version = config.env.version || 'stg'

    // load env from json
    config.env = require(`../config/${version}.json`);

    // change baseUrl
    config.baseUrl = config.env.baseUrl

    return config
}
