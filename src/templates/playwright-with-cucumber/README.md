# E2E Automation Template — Cucumber + Playwright

Template institucional de testes E2E com **Cucumber + Playwright + TypeScript**, organizado como referência de arquitetura BDD para novos projetos de automação.

## Objetivo

Padronizar a forma como a equipe estrutura suítes de teste E2E com comportamento orientado por negócio (BDD), servindo como ponto de partida pronto para uso (scaffold) e como guia de consulta sobre Gherkin, Page Object Model, World, multi-ambiente e relatórios Allure — reduzindo decisões repetidas a cada novo projeto.

## Estrutura de pastas

```
.
├── features/               # Cenários em Gherkin (linguagem de negócio, sem código técnico)
│   ├── login.feature
│   └── cart.feature
├── step-definitions/       # Implementação dos passos Gherkin em TypeScript
│   ├── login.steps.ts
│   └── cart.steps.ts
├── support/                # Infraestrutura Cucumber: World e Hooks
│   ├── world.ts            # PlaywrightWorld: injeta browser, context, page e Page Objects
│   └── hooks.ts            # Before/After: ciclo de vida do browser por cenário
├── pages/                  # Page Object Model (agnóstico ao runner)
│   ├── BasePage.ts         # Classe base: expõe `page`, `goto` e helpers de espera
│   ├── LoginPage.ts
│   ├── InventoryPage.ts
│   ├── ProductPage.ts
│   └── index.ts            # Barrel export
├── data/                   # Massa de testes em JSON
│   └── login-massa.json    # Usuários, produtos e mensagens de erro esperadas
├── config/                 # Configuração por ambiente
│   ├── qa.config.ts        # baseUrl de QA
│   ├── dev.config.ts       # baseUrl de DEV
│   └── index.ts            # Seletor de ambiente via NODE_ENV
├── .github/
│   ├── workflows/
│   │   └── ci.yml          # Pipeline de CI (GitHub Actions)
│   └── dependabot.yml      # Atualização automática de actions
├── cucumber.js             # Configuração do Cucumber (perfis: default, smoke, regression)
├── tsconfig.json
└── package.json
```

| Camada | Responsabilidade |
|---|---|
| `features/*.feature` | Descreve comportamento esperado em linguagem Gherkin — lido por negócio e QA |
| `step-definitions/*.steps.ts` | Liga cada passo Gherkin a uma ação ou asserção via Page Objects |
| `support/world.ts` | `PlaywrightWorld` é o contexto compartilhado do cenário: browser, page e páginas injetadas |
| `support/hooks.ts` | Inicializa e encerra o browser a cada cenário; carrega `.env`; configura `testIdAttribute` |
| `pages/*Page.ts` | Um Page Object por tela; seletores `private readonly`; zero asserções |
| `data/login-massa.json` | Dados de teste em JSON puro — nenhum dado fixo nas steps |
| `config/` | `baseURL` dinâmico por `NODE_ENV`; validado antes de cada execução |

## Pré-requisitos

- **Node.js ≥ 18**
- **npm ≥ 9**
- **Git**

## Instalação

```bash
git clone <repo-url>
cd <pasta-do-projeto>
npm install
npx playwright install chromium
```

## Variáveis de ambiente

Copie o arquivo de exemplo e preencha os valores:

```bash
cp .env.example .env
```

| Variável | Descrição |
|---|---|
| `SAUCE_PASSWORD` | Senha dos usuários de teste do Sauce Demo |
| `INVALID_PASSWORD` | Senha inválida usada nos cenários de edge case |

O `.env` é ignorado pelo Git. Em CI, configure os valores como **secrets** no repositório (veja a seção [Pipeline de CI](#pipeline-de-ci)).

## Como executar os testes

```bash
# Suíte completa — ambiente QA (padrão)
npm test

# Por ambiente
npm run test:qa      # explícito QA
npm run test:dev     # ambiente DEV

# Por tag Cucumber
npm run test:smoke      # cenários @smoke
npm run test:regression # cenários @regression
```

O ambiente é controlado por `NODE_ENV` (`qa` por padrão), que seleciona a `baseURL` em `config/`:

```bash
NODE_ENV=dev npm test          # macOS / Linux
$env:NODE_ENV='dev'; npm test  # Windows PowerShell
```

## Relatórios

### Relatório Cucumber (HTML + JSON)

Gerado automaticamente a cada execução em `cucumber-report/`:

```
cucumber-report/
├── index.html   # relatório HTML interativo
└── report.json  # dados brutos para integração com outras ferramentas
```

### Relatório Allure

```bash
# Gera o HTML a partir dos resultados da última execução
npm run allure:generate

# Abre o relatório no navegador
npm run allure:open
```

O `allure-cucumberjs/reporter` (formatter configurado em `cucumber.js`) grava `allure-results/` durante a execução. O `allure-commandline` converte esses dados em HTML com dashboards, histórico e trend de execuções.

## Perfis Cucumber

Definidos em `cucumber.js`:

| Perfil | Comando | Filtro |
|---|---|---|
| `default` | `npm test` | todos os cenários |
| `smoke` | `npm run test:smoke` | `@smoke` |
| `regression` | `npm run test:regression` | `@regression` |

Para adicionar um novo perfil, edite `cucumber.js`:

```js
meu_perfil: { ...common, tags: '@minha-tag' },
```

## Pipeline de CI

Workflow em `.github/workflows/ci.yml`.

### Gatilhos

| Gatilho | Comportamento |
|---|---|
| `push` em `main`/`master` | Executa a suíte completa em QA, gera Allure e publica no GitHub Pages |
| `pull_request` para `main`/`master` | Executa em QA e publica artifacts; sem deploy no Pages |
| `workflow_dispatch` | Execução manual com seleção de `target_environment` e `test_tag` opcional |

### Concorrência

PRs cancelam execuções anteriores do mesmo branch automaticamente (`cancel-in-progress: true`). Execuções em `main` nunca são canceladas.

### Multiambiente

O input `target_environment` define `NODE_ENV`. O workflow valida que existe um arquivo `config/<ambiente>.config.ts` antes de iniciar os testes.

### Filtro por tag

O input `test_tag` passa o valor para `--tags` do Cucumber:

```
@smoke      → executa apenas cenários marcados com @smoke
@regression → executa apenas cenários marcados com @regression
(vazio)     → executa a suíte completa
```

### Secrets necessários

Configure em **Settings → Secrets and variables → Actions**:

| Secret | Descrição |
|---|---|
| `SAUCE_PASSWORD` | Senha dos usuários de teste |
| `INVALID_PASSWORD` | Senha inválida para os cenários de erro |

O workflow detecta automaticamente pull requests de forks e exibe uma mensagem explicativa quando os secrets não estão disponíveis.

### Allure e GitHub Pages

O workflow preserva o histórico Allure por ambiente entre execuções:

```
allure-report/history  →  cache allure-history-<env>-*  →  allure-results/history
```

O relatório é publicado no GitHub Pages quando a execução ocorre na branch padrão. Para habilitar:

```
Settings → Pages → Source → GitHub Actions
```

### Dependabot

O arquivo `.github/dependabot.yml` atualiza as GitHub Actions automaticamente toda semana, mantendo versões de `actions/checkout`, `actions/setup-node` e outras sempre atualizadas.

## Adicionando novos testes

1. Escreva o cenário em `features/<nome>.feature` usando Given/When/Then
2. Execute `npm test` — o Cucumber listará os steps pendentes com snippets TypeScript
3. Implemente os steps em `step-definitions/<nome>.steps.ts` usando os Page Objects existentes
4. Crie um novo Page Object em `pages/` se a nova tela ainda não estiver mapeada
5. Registre o Page Object no `PlaywrightWorld` em `support/world.ts` e nos hooks em `support/hooks.ts`

## Padrões aplicados

- **BDD / Gherkin**: cenários escritos em linguagem de negócio, independentes de implementação técnica
- **Page Object Model**: `pages/*` mapeia elementos e ações; zero asserções nas páginas
- **World como injeção de dependência**: `PlaywrightWorld` entrega browser e Page Objects prontos para cada step
- **Isolamento por cenário**: browser criado e destruído no `Before`/`After` de cada cenário
- **DRY / DAMP**: massa de dados isolada em JSON, tipada em TypeScript, sem hardcode nas steps
- **Multi-ambiente**: `baseURL` dinâmico via `NODE_ENV`, validado antes da execução
- **Evidências sob demanda**: `allure-cucumberjs` grava screenshots e traces em falhas automaticamente

## Playground utilizado

Os testes apontam para o [Sauce Demo](https://www.saucedemo.com) — uma aplicação de e-commerce pública mantida pela Sauce Labs para demonstrações e treinamentos de automação. Permite evoluir e validar o template (login, inventário, carrinho) sem depender de ambientes internos.

## Referências

- [Cucumber Documentation](https://cucumber.io/docs/cucumber/)
- [Cucumber.js — GitHub](https://github.com/cucumber/cucumber-js)
- [Gherkin Reference](https://cucumber.io/docs/gherkin/reference/)
- [Playwright Documentation](https://playwright.dev)
- [Allure Cucumber JS](https://allurereport.org/docs/cucumberjs/)
- [Allure Report](https://allurereport.org/docs/)
- [GitHub Pages Custom Workflows](https://docs.github.com/en/pages/getting-started-with-github-pages/using-custom-workflows-with-github-pages)

---

**Versão do template:** 2.0.0
