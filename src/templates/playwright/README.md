# Playwright E2E Template

Template institucional de testes E2E com **Playwright + TypeScript**, organizado como referência de arquitetura, nomenclatura e boas práticas para novos projetos de automação.

## Objetivo

Padronizar a forma como a equipe estrutura suítes de teste E2E, servindo como ponto de partida pronto para uso (scaffold) e como guia de consulta sobre Page Object Model, fixtures, massa de dados, multi-ambiente e relatórios — reduzindo decisões repetidas a cada novo projeto.

## Estrutura de pastas

```
project-structure-playwright-ui/
├── config/                 # Configuração por ambiente (qa, dev) e index centralizador
├── pages/                  # Page Objects (BasePage + páginas específicas) e barrel index.ts
├── fixtures/               # Fixtures do Playwright: injeta pages, massa de dados e allure
├── data/                   # Massa de testes em JSON (usuários, mensagens, produtos)
├── tests/                  # Specs E2E (Login.spec.ts, cart.spec.ts)
├── .github/workflows/      # Pipeline de CI (ci.yml)
├── global-setup.ts         # Gera allure-results/environment.properties no início da run
├── playwright.config.ts    # Configuração principal (projetos, reporters, timeouts)
└── package.json            # Scripts npm e dependências
```

| Pasta/arquivo | Responsabilidade |
|---|---|
| `pages/BasePage.ts` | Classe base: expõe `page`, `goto` e helpers de espera comuns |
| `pages/*Page.ts` | Um Page Object por tela; seletores `private readonly`, sem asserções |
| `fixtures/page-fixtures.ts` | Estende `base.extend`, injeta `loginPage`, `inventoryPage`, `productPage`, `data` e `allure` |
| `data/login-massa.json` | Dados de teste em JSON puro — nenhum dado fica hardcoded nos specs |
| `tests/*.spec.ts` | Consome apenas fixtures; concentra as asserções (`expect`) |

## Como baixar e instalar

Pré-requisitos: **Node.js ≥ 18**, **npm ≥ 9**, **Git**.

```bash
git clone <repo-url>
cd project-structure-playwright-ui
npm install
```

`npm install` traz `@playwright/test`, `@types/node`, `cross-env`, `allure-playwright` e `allure-commandline`.

## Como executar testes e relatórios

```bash
npm test                # suíte completa, ambiente QA (padrão)
npm run test:qa         # idem, explícito
npm run test:dev        # ambiente DEV
npm run test:chromium   # apenas Chromium
npm run test:smoke      # specs marcados @smoke
npm run test:regression # specs marcados @regression
npm test -- --list      # lista os testes sem executar
```

Ambiente é selecionado por `NODE_ENV` (`qa` por padrão), que define a `baseURL` em `config/`:

```bash
NODE_ENV=dev npx playwright test        # macOS/Linux
$env:NODE_ENV='dev'; npx playwright test # Windows PowerShell
```

**Relatório HTML (nativo do Playwright):**

```bash
npm run show-report
```

**Relatório Allure:**

```bash
npm run test:allure       # roda os testes e já gera o relatório Allure
npm run allure:generate   # gera o relatório a partir de allure-results/ existente
npm run allure:open       # abre o relatório Allure no navegador
```

O `global-setup.ts` grava `allure-results/environment.properties` (ambiente, baseURL, versão do Node) para rastreabilidade no Allure.

## Padrões, boas práticas e técnicas

- **Page Object Model**: `pages/*` mapeia elementos e ações; `BasePage` concentra utilitários comuns.
- **Encapsulamento**: seletores são `private readonly`; cada PO expõe só métodos de ação/consulta — sem `expect`.
- **Fixtures como injeção de dependência**: `fixtures/page-fixtures.ts` entrega Page Objects, massa de dados e helpers do Allure prontos para o teste.
- **DRY/DAMP**: massa de dados isolada em JSON (`data/`), reutilizada via fixture e tipada em TypeScript.
- **Separação de responsabilidades**: `config` (ambiente), `pages` (mapeamento), `fixtures` (injeção), `tests` (fluxo + asserção).
- **Multi-ambiente**: `baseURL` dinâmico via `NODE_ENV`, configs centralizadas em `config/index.ts`.
- **Multi-reporter**: HTML nativo + Allure + saída em terminal.
- **Evidências sob demanda**: screenshots, vídeos e traces gerados apenas em falhas, economizando disco e tempo de execução.

## Execução via pipeline

Workflow do GitHub Actions em `.github/workflows/ci.yml`:

1. Dispara em `push`, `pull_request` e execução manual (`workflow_dispatch`).
2. Executa Playwright em `qa` por padrão, com suporte a seleção manual de ambiente e tag.
3. Gera e publica artifacts do Allure mesmo quando os testes falham.
4. Publica o relatório Allure no GitHub Pages quando a execução roda na branch padrão.
5. Preserva o histórico do Allure por ambiente para exibir trend.

> Nota: PRs de fork não recebem secrets do repositório pelo GitHub Actions. Por isso o workflow agora falha com erro claro se `SAUCE_PASSWORD` ou `INVALID_PASSWORD` estiverem ausentes, evitando qualquer fallback de credenciais.

A documentação completa do workflow está em [GitHub Actions para Playwright](docs/github-actions-playwright.md).

## Diferencial do template e playground utilizado

Este repositório não é uma suíte de testes de um produto específico — é um **scaffold de referência**: a estrutura de pastas, convenções de nomenclatura, padrão de fixtures e configuração multi-ambiente podem ser copiados diretamente para iniciar um novo projeto de automação já alinhado aos padrões da equipe.

Como **playground**, os testes apontam para o [Sauce Demo](https://www.saucedemo.com) (`qa`) e seu espelho de homologação (`dev`) — uma aplicação de e-commerce pública e estável, mantida pela Sauce Labs justamente para demonstrações e treinamentos de automação. Isso permite validar e evoluir o template (login, inventário, carrinho) sem depender de ambientes internos, dados sensíveis ou instabilidade de sistemas em desenvolvimento.

## Referências

- [Playwright Documentation](https://playwright.dev)
- [Playwright Test Framework](https://playwright.dev/docs/test-intro)
- [Playwright Continuous Integration](https://playwright.dev/docs/ci)
- [Page Object Model Pattern](https://playwright.dev/docs/pom)
- [Allure Report](https://docs.qameta.io/allure/)
- [GitHub Pages Custom Workflows](https://docs.github.com/en/pages/getting-started-with-github-pages/using-custom-workflows-with-github-pages)
- [Best Practices for E2E Testing](https://playwright.dev/docs/best-practices)

---

**Versão do template:** 1.0.0
