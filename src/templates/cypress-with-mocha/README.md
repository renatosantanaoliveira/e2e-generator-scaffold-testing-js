[javascript-image]: https://img.shields.io/badge/javascript-ES2020-yellow
[javascript-url]: https://developer.mozilla.org/en-US/docs/Web/JavaScript
[cypress-image]: https://img.shields.io/badge/cypress-15.15.0-04C38E
[cypress-url]: https://docs.cypress.io/guides/overview/why-cypress

# Cypress Test Template — UI + API

[![JavaScript][javascript-image]][javascript-url]
[![Cypress][cypress-image]][cypress-url]

Template de testes automatizados com Cypress usando **Page Object** (UI) e **API Object** (serviços), reporter Allure e visualização de requests via `cy.api`.

## Stack

| Pacote | Versão | Finalidade |
|---|---|---|
| cypress | 15.15.0 | Test runner |
| @shelex/cypress-allure-plugin | ^3.0.0 | Reporter Allure |
| @faker-js/faker | ^9.0.0 | Geração de dados |
| cypress-plugin-api | ^2.11.1 | Visualização de requests (`cy.api`) |

## Estrutura

```
./
├── .github/workflows/main.yml     # CI com paralelismo
├── cypress/
│   ├── config/
│   │   ├── dev.json               # Ambientes: baseUrl + apiUrl
│   │   └── qa.json
│   ├── e2e/
│   │   ├── Service/               # Testes de API (usa API Objects)
│   │   │   ├── Account.spec.js
│   │   │   └── BookStore.spec.js
│   │   └── Ui/                    # Testes de UI (usa Page Objects)
│   │       ├── BookStore.spec.js
│   │       └── Signin.spec.js
│   ├── fixtures/
│   │   └── user.json
│   └── support/
│       ├── api/                   # API Object pattern
│       │   ├── BaseApi.js
│       │   ├── AccountApi.js
│       │   └── BookStoreApi.js
│       ├── BookStore/             # Page Object pattern
│       │   ├── BookStoreElements.js
│       │   └── BookStorePage.js
│       ├── Home/
│       │   ├── HomeElements.js
│       │   └── HomePage.js
│       ├── SignIn/
│       │   ├── SignInElements.js
│       │   └── SignInPage.js
│       ├── commands.js
│       ├── e2e.js
│       └── utils.js
├── cypress.config.js
└── package.json
```

## Setup

```bash
npm install
```

## Execução

```bash
# Interface gráfica
npm run cy:open

# Headless (ambiente qa por padrão)
npm run test

# Ambiente específico
npm run test:env -- --env version=dev

# Com relatório Allure
npm run test:reporter
npm run allure:open
```

## Padrões aplicados

### Page Object (UI)
Cada página tem dois arquivos separados: `*Elements.js` com seletores e `*Page.js` com ações e asserções. Os testes nunca interagem com seletores diretamente.

### API Object (Serviços)
Classes em `support/api/` herdam de `BaseApi` e encapsulam chamadas HTTP. Os testes chamam métodos semânticos (`accountApi.createUser(...)`) em vez de `cy.request()` diretamente.

### DAMP (testes) + DRY (código)
- Nomes de `it()` descrevem o comportamento esperado de forma completa e lível isoladamente
- Lógica repetida (montagem de request, seletores) centralizada nas classes de suporte

## Ambientes

Configure `baseUrl` e `apiUrl` nos arquivos `cypress/config/{env}.json`.
