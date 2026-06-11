import './commands'
import 'cypress-plugin-api'

// @shelex/cypress-allure-plugin: bug in cypress open mode when switching specs
// (patching.js references `config` from index.js scope that is undefined in that context).
// Allure is a CI/headless reporting tool — only load it in run mode.
if (!Cypress.config('isInteractive')) {
  require('@shelex/cypress-allure-plugin')
}

// ElementSelector (Cypress 15+) replaces SelectorPlayground.
// Use optional chaining + nullish coalescing: ElementSelector may be undefined
// in cypress open mode when this file first loads.
;(Cypress.ElementSelector ?? Cypress.SelectorPlayground)?.defaults({
  selectorPriority: ['data-test', 'data-testid', 'id', 'class', 'attributes', 'tag', 'nth-child'],
})

Cypress.on('uncaught:exception', () => false)
