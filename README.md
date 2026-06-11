[javascript-image]: https://img.shields.io/badge/javascript-ES6-orange
[javascript-url]: https://262.ecma-international.org/6.0/
[nodejs-image]: https://img.shields.io/badge/nodejs-18.x-green
[nodejs-url]: https://nodejs.org/en/docs/
[cypress-image]: https://img.shields.io/badge/cypress-15.15.0-beige
[cypress-url]: https://docs.cypress.io/guides/overview/why-cypress
[cucumber-image]: https://img.shields.io/badge/cucumber-24.0.1-brightgreen
[cucumber-url]: https://github.com/badeball/cypress-cucumber-preprocessor
[playwright-image]: https://img.shields.io/badge/playwright-1.60.0-blue
[playwright-url]: https://playwright.dev/
[supertest-image]: https://img.shields.io/badge/supertest-7.2.2-black
[supertest-url]: https://github.com/visionmedia/supertest#readme

# Scaffolding generator to test e2e
[![JavaScript Version][javascript-image]][javascript-url]
[![NodeJS Version][nodejs-image]][nodejs-url]
[![Cypress Version][cypress-image]][cypress-url]
[![Cucumber Version][cucumber-image]][cucumber-url]
[![Playwright Version][playwright-image]][playwright-url]
[![SuperTest Version][supertest-image]][supertest-url]

Scaffolding para geração de projetos de testes E2E com suporte a múltiplos frameworks e abordagens.

## Templates disponíveis

| Template | Framework | Estilo | Relatório |
|---|---|---|---|
| `cypress-with-cucumber` | Cypress 15.15.0 | BDD / Gherkin | Allure |
| `cypress-with-mocha` | Cypress 15.15.0 | Spec / Mocha | Allure |
| `playwright` | Playwright 1.60.0 | Spec / POM | Allure |
| `playwright-with-cucumber` | Playwright 1.60.0 | BDD / Gherkin | Allure |
| `supertest-api` | SuperTest 7.2.2 | REST API / Mocha | Mochawesome |

## Estrutura do projeto

```
.
├── dist
├── src
│   ├── index.ts
│   ├── templates
│   │   ├── cypress-with-cucumber
│   │   ├── cypress-with-mocha
│   │   ├── playwright
│   │   ├── playwright-with-cucumber
│   │   └── supertest-api
│   └── utils
│       └── template.ts
├── tsconfig.json
├── package.json
└── README.md
```

## Configurando ambiente local

### Pré-requisitos
- **Node.js 18.x** ou superior ([Download](https://nodejs.org/))
- **npm** (vem com o Node.js)

### Instalação do Scaffolding

1. Clone o repositório e acesse a pasta:
```bash
git clone <seu-repositorio>
cd e2e-generator-scaffold-testing-js
```

2. Instale as dependências:
```bash
npm install
```

3. Compile o projeto TypeScript:
```bash
npm run build
```

4. Registre o comando `scaffold-testing` globalmente na sua máquina:
```bash
npm link
```

### Utilizando o Scaffolding para criar um novo projeto

Agora você pode usar o scaffolding em **qualquer pasta** da sua máquina:

```bash
scaffold-testing
```

O assistente vai te fazer 2 perguntas:
1. **Qual template deseja usar?** (cypress-with-cucumber, cypress-with-mocha, playwright, playwright-with-cucumber ou supertest-api)
2. **Qual o nome do seu projeto?**

Depois disso, o scaffolding vai:
- Criar uma pasta com o nome do seu projeto
- Copiar todos os arquivos do template selecionado
- Preencher os campos dinâmicos (como o nome do projeto)
- Instalar todas as dependências automaticamente

Pronto! Sua estrutura de testes está criada e pronta para desenvolvimento!

---

## Detalhes dos templates

### cypress-with-cucumber
Testes E2E com Cypress e BDD usando Gherkin/Cucumber. Inclui Page Object, API Object e suporte a múltiplos ambientes.

**Principais dependências:**
- `cypress` 15.15.0
- `@badeball/cypress-cucumber-preprocessor` 24.0.1
- `@faker-js/faker` 10.4.0
- `@shelex/cypress-allure-plugin` 2.41.2
- `cypress-plugin-api` 2.11.2

**Scripts úteis:**
```bash
npm test                  # executa os testes (headless)
npm run cy:open           # abre o Cypress
npm run cy:run:qa         # executa no ambiente QA
npm run test:allure       # executa e gera relatório Allure
```

---

### cypress-with-mocha
Testes E2E com Cypress no estilo Spec/Mocha. Inclui Page Object, API Object e relatórios Allure.

**Principais dependências:**
- `cypress` 15.15.0
- `@faker-js/faker` 10.4.0
- `@shelex/cypress-allure-plugin` 2.41.2
- `cypress-plugin-api` 2.11.2

**Scripts úteis:**
```bash
npm test                  # executa os testes (headless)
npm run cy:open           # abre o Cypress
npm run test:env          # executa no ambiente QA
npm run test:reporter     # executa e gera relatório Allure
```

---

### playwright
Testes E2E com Playwright e Page Object Model. Suporte a múltiplos ambientes, browsers e relatórios Allure.

**Principais dependências:**
- `@playwright/test` ^1.60.0
- `cross-env` ^7.0.3
- `allure-playwright` ^2.0.0

**Scripts úteis:**
```bash
npm test                  # executa todos os testes
npm run test:qa           # executa no ambiente QA
npm run test:chromium     # executa somente no Chromium
npm run test:ui           # abre o Playwright UI mode
npm run test:allure       # executa e gera relatório Allure
```

---

### playwright-with-cucumber
Testes E2E com Playwright e BDD usando Gherkin/Cucumber. Arquitetura orientada a comportamento com TypeScript e relatórios Allure.

**Principais dependências:**
- `@playwright/test` ^1.60.0
- `@cucumber/cucumber` ^11.0.0
- `allure-cucumberjs` ^3.9.0
- `cross-env` ^7.0.3

**Scripts úteis:**
```bash
npm test                  # executa todos os testes (QA)
npm run test:smoke        # executa testes com tag @smoke
npm run test:regression   # executa testes com tag @regression
npm run test:headed       # executa com browser visível
npm run test:debug        # executa no modo debug (Playwright Inspector)
npm run allure:generate   # gera relatório Allure
```

---

### supertest-api
Testes de API REST com SuperTest e Mocha. Inclui API Object Pattern, suporte a múltiplos ambientes e relatórios Mochawesome.

**Principais dependências:**
- `supertest` ^7.2.2
- `mocha` ^11.7.6
- `chai` ^6.2.2
- `@faker-js/faker` ^10.4.0
- `mochawesome` ^7.1.4

**Scripts úteis:**
```bash
npm test                  # executa todos os testes
npm run test:qa           # executa no ambiente QA
npm run test:smoke        # executa testes com tag @smoke
npm run test:regression   # executa testes com tag @regression
npm run report:merge      # combina relatórios JSON
npm run report:generate   # gera relatório Mochawesome
```

---

## Desenvolvimento do Scaffolding (para contribuidores)

Se você quer melhorar os templates ou adicionar novos recursos:

- Para testar durante o desenvolvimento (sem compilar):
```bash
npm start
```

- Para compilar após fazer alterações:
```bash
npm run build
```

- Para limpar os arquivos compilados:
```bash
npm run clean
```

- Após compilar, teste com o comando global:
```bash
npm link
scaffold-testing
```
