[javascript-image]: https://img.shields.io/badge/javascript-ESM-orange
[javascript-url]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Modules
[nodejs-image]: https://img.shields.io/badge/nodejs-18%2B-green
[nodejs-url]: https://nodejs.org/
[supertest-image]: https://img.shields.io/badge/supertest-7.x-black
[supertest-url]: https://github.com/ladjs/supertest#readme
[mocha-image]: https://img.shields.io/badge/mocha-11.x-brown
[mocha-url]: https://mochajs.org/
[mochawesome-image]: https://img.shields.io/badge/mochawesome-7.x-blue
[mochawesome-url]: https://github.com/adamgruber/mochawesome#readme

# Scaffolding Template — REST API Tests with SuperTest

[![JavaScript Version][javascript-image]][javascript-url]
[![NodeJS Version][nodejs-image]][nodejs-url]
[![SuperTest Version][supertest-image]][supertest-url]
[![Mocha Version][mocha-image]][mocha-url]
[![Mochawesome Version][mochawesome-image]][mochawesome-url]

Template institucional para testes de API REST com **SuperTest**, **Mocha** e **Chai**, aplicando o padrão **API Object**, convenções **DAMP/DRY** e sistema de tags para filtragem de suítes.

---

## Estrutura do projeto

```
./
├── src/
│   ├── api/
│   │   ├── AccountApi.js        # API Object — endpoints de Account
│   │   └── BookStoreApi.js      # API Object — endpoints de BookStore
│   ├── config/
│   │   └── index.js             # Config centralizada (baseUrl, timeout)
│   └── factories/
│       └── userFactory.js       # Fábrica de dados de teste (faker)
├── tests/
│   ├── Account/
│   │   └── Account.spec.js
│   └── BookStore/
│       └── BookStore.spec.js
├── .env.example                 # Template de variáveis de ambiente
├── .gitignore
├── .mocharc.json                # Configuração do Mocha (spec, reporter, timeout)
└── package.json
```

---

## Decisões de arquitetura

### API Object Pattern

Cada arquivo em `src/api/` encapsula todos os requests de um grupo de endpoints, mantendo os testes livres de detalhes de HTTP. Os testes apenas orquestram e validam.

```js
// src/api/BookStoreApi.js
export class BookStoreApi {
  listBooks()           // GET /Books
  getBookByIsbn(isbn)   // GET /Book?ISBN=:isbn
}

// src/api/AccountApi.js
export class AccountApi {
  createUser(userData)           // POST /User
  generateToken(credentials)     // POST /GenerateToken
  getUser(userId, token)         // GET /User/:id
  deleteUser(userId, token)      // DELETE /User/:id
}
```

### DAMP — Nomes de teste autodescritivos

Cada `it()` é compreensível sem precisar ler o `describe` pai. O nome inclui método HTTP, endpoint e comportamento esperado.

```js
// ❌ Ruim — ambíguo fora de contexto
it('List all books', ...)

// ✅ DAMP — autocontido
it('@smoke should return 200 and a non-empty list of books', ...)
it('@regression first catalog entry should match the known "Git Pocket Guide" record', ...)
```

### DRY — Sem duplicação de setup

- **API Objects** eliminam repetição de `request(baseUrl).get(path).set(headers)`
- **Factories** centralizam criação de dados de teste com `userFactory.build(overrides)`
- **Config** centraliza baseUrl e timeout, configuráveis por variável de ambiente

### Tags de teste

As tags são prefixos nos títulos dos `it()` e filtradas com `--grep`:

| Tag | Propósito |
|---|---|
| `@smoke` | Happy path, execução rápida em pipelines |
| `@regression` | Validações de contrato, edge cases, regressão |
| `@bookstore` | Suíte BookStore |
| `@account` | Suíte Account |

---

## Pré-requisitos

- Node.js >= 18

---

## Instalação

```bash
npm install
```

Configure o ambiente copiando o `.env.example`:

```bash
cp .env.example .env
```

---

## Execução dos testes

| Comando | Descrição |
|---|---|
| `npm test` | Executa todos os testes e gera report HTML em `reports/` |
| `npm run test:smoke` | Executa apenas testes `@smoke` |
| `npm run test:regression` | Executa apenas testes `@regression` |
| `npm run test:ci` | Saída compacta para pipelines CI sem geração de HTML |

### Report HTML

Após `npm test`, o report estará em `reports/test-results.html`. Para merge de execuções paralelas:

```bash
npm run report:merge     # Combina múltiplos JSONs em reports/combined.json
npm run report:generate  # Gera HTML final em reports/index.html
```

---

## Adicionando novos endpoints

1. Crie ou edite o API Object em `src/api/`
2. Se necessário, adicione factories em `src/factories/`
3. Escreva os testes em `tests/<Suite>/<Suite>.spec.js` com tags `@smoke` e `@regression`
4. A variável `baseUrl` é configurável via `.env` — sem hardcode nos testes
