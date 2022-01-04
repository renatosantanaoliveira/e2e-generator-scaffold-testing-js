[javascript-image]: https://img.shields.io/badge/javascript-ES6-orange
[javascript-url]: https://262.ecma-international.org/6.0/
[nodejs-image]: https://img.shields.io/badge/nodejs-14.x-green
[nodejs-url]: https://nodejs.org/en/docs/
[supertest-image]:https://img.shields.io/badge/supertest-7.7.0-black
[supertest-url]:https://github.com/visionmedia/supertest#readme
# Scaffolding generator to test e2e
[![JavaScript Version][javascript-image]][javascript-url]
[![NodeJS Version][nodejs-image]][nodejs-url]
[![SupertTest Version][supertest-image]][supertest-url]
# Project to perform api tests using SuperTest

Estrutura do projeto
```
./
├── tests
│   ├── Account
│   │   └── Account.spec.js
│   └── BookStore
│       └── BookStore.spec.js
├── config.js
├── package.json
├── README.md
└── tsconfig.json
```

## Configurando ambiente local

Assumimos que você já ***possui o NodeJS disponível no terminal***. Agora você precisará do **npm** para baixar todas as dependências dos pacotes do projeto, conforme o arquivo **[package.json](https://github.com/renatosantanaoliveira/e2e-testing-scaffolding/tree/main/src/templates/superTest-api/package.json)**.

Para baixar as dependências de pacote deste projeto abra a pasta "**[raiz](https://github.com/renatosantanaoliveira/e2e-testing-scaffolding/tree/main/src/templates/superTest-api)**" no terminal e execute o comando:
```
npm install
```

Para execução local dos teste, após instalar as dependências no terminal execute o comando:
```
npm test
```