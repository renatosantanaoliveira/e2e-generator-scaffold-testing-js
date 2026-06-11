import './commands'
import 'cypress-plugin-api'

// @shelex/cypress-allure-plugin has a bug in cypress open mode: patching.js references
// `config` from index.js scope that is undefined when switching between specs.
// Allure is a CI/headless reporting tool — only load it in run mode.
if (!Cypress.config('isInteractive')) {
  require('@shelex/cypress-allure-plugin')
}

// ElementSelector (Cypress 15+) replaces SelectorPlayground; use optional chaining
// because in cypress open mode the namespace may not be initialized when this file loads
;(Cypress.ElementSelector ?? Cypress.SelectorPlayground)?.defaults({
  selectorPriority: ['data-test', 'data-testid', 'id', 'class', 'attributes', 'tag', 'nth-child']
})

Cypress.on('uncaught:exception', () => false)
