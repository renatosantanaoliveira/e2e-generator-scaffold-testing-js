[javascript-image]: https://img.shields.io/badge/javascript-ES2020-yellow
[javascript-url]: https://developer.mozilla.org/en-US/docs/Web/JavaScript
[cucumber-image]: https://img.shields.io/badge/cucumber-^22.0.0-brightgreen
[cucumber-url]: https://github.com/badeball/cypress-cucumber-preprocessor
[cypress-image]: https://img.shields.io/badge/cypress-15.15.0-04C38E
[cypress-url]: https://docs.cypress.io

# Cypress + Cucumber + Allure — Template

[![JavaScript][javascript-image]][javascript-url]
[![Cucumber][cucumber-image]][cucumber-url]
[![Cypress][cypress-image]][cypress-url]

## Estrutura do projeto

```
./
├── .github/
│   └── workflows/
│       └── main.yml
├── cypress/
│   ├── config/
│   │   ├── dev.json          # baseUrl e apiBaseUrl por ambiente
│   │   └── qa.json
│   ├── e2e/
│   │   ├── Service/          # Testes de API (.feature)
│   │   │   └── BookStore.feature
│   │   └── UI/               # Testes de frontend (.feature)
│   │       └── Login.feature
│   ├── fixtures/
│   │   └── user.json
│   └── support/
│       ├── api/              # API Objects — encapsulam cy.request por serviço
│       │   └── BookStoreApi.js
│       ├── pages/            # Page Objects — seletores + ações por página
│       │   ├── HomePage.js
│       │   └── LoginPage.js
│       ├── step_definitions/ # Glue code Gherkin → objetos
│       │   ├── BookStoreSteps.js
│       │   └── LoginSteps.js
│       ├── commands.js       # Custom commands reutilizáveis (cy.loginAs, cy.apiRequest)
│       ├── e2e.js            # Entry point do support
│       └── utils.js          # Geradores de dados aleatórios (via @faker-js/faker)
├── cypress.config.js
└── package.json
```

## Instalação

```bash
npm install
```

> **Atenção:** Após `npm install`, verifique no `npm ls` que as versões resolvidas de
> `@badeball/cypress-cucumber-preprocessor`, `@bahmutov/cypress-esbuild-preprocessor` e
> `@shelex/cypress-allure-plugin` são compatíveis com Cypress 15.

## Execução

| Comando | Descrição |
|---|---|
| `npm test` | Roda todos os testes (headless) |
| `npm run cy:open` | Abre o Cypress Test Runner |
| `npm run cy:run:qa` | Roda apontando para ambiente QA |
| `npm run cy:run:dev` | Roda apontando para ambiente Dev |
| `npm run test:allure` | Roda + gera relatório Allure |
| `npm run allure:open` | Abre o relatório Allure gerado |

## Padrões aplicados

### Page Object (UI)
Cada arquivo em `support/pages/` encapsula seletores (objeto `sel` privado ao módulo) e
métodos de interação/asserção. Step definitions importam a instância da página e chamam
apenas métodos nomeados — sem `cy.get` exposto no step.

### API Object (Service)
Cada arquivo em `support/api/` representa um serviço/recurso. Os métodos delegam para o
custom command `cy.apiRequest`, que injeta `Cypress.env('apiBaseUrl')` automaticamente e
usa `cy.api()` do `cypress-plugin-api` para exibição visual.
Step definitions não usam `cy.request` diretamente.

### Visualização estilo Postman (`cypress-plugin-api`)
O `cy.apiRequest()` usa `cy.api()` internamente. No `cypress open`, cada chamada exibe
automaticamente no runner: método HTTP, URL completa, headers, corpo da requisição,
status code, tempo de resposta e corpo da resposta com JSON colapsável.

Para ocultar credenciais sensíveis nos headers passe `hideCredentials: true` no env do
teste:

```js
// BookStore.feature step — exemplo com auth
cy.apiRequest('GET', '/BookStore/v1/Books', null, { hideCredentials: true })
```

Para combinar chamadas de API com teste de UI sem sobrepor a tela, use `snapshotOnly`:

```js
// cypress/config/qa.json
{ "snapshotOnly": true }
```

### DAMP (testes)
Cada Scenario nos arquivos `.feature` é autoexplicativo: descreve a precondição, ação e
resultado esperado sem depender de contexto externo. Os passos usam linguagem de negócio,
não linguagem de implementação.

### DRY (código)
- Seletores vivem somente no Page/API Object — sem duplicação entre layers.
- `cy.loginAs()` centraliza o fluxo de autenticação para reuso em `Background` ou `before`.
- `cy.apiRequest()` centraliza headers e baseUrl de API.
- `utils.js` delega geração de dados ao `@faker-js/faker`.

## Configuração de ambiente

Edite os arquivos em `cypress/config/` para cada ambiente:

```json
{
  "baseUrl": "https://sua-app.com",
  "apiBaseUrl": "https://api.sua-app.com",
  "allure": "true"
}
```

Selecione o ambiente na execução:

```bash
npx cypress run --env version=dev
```
