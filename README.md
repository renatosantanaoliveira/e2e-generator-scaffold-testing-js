[javascript-image]: https://img.shields.io/badge/javascript-ES6-orange
[javascript-url]: https://262.ecma-international.org/6.0/
[nodejs-image]: https://img.shields.io/badge/nodejs-14.x-green
[nodejs-url]: https://nodejs.org/en/docs/
[cypress-image]:https://img.shields.io/badge/cypress-9.2.0-beige
[cypress-url]:https://docs.cypress.io/guides/overview/why-cypress
[cucumber-image]: https://img.shields.io/badge/cucumber-5.3.0-brightgreen
[cucumber-url]: https://cucumber.io/docs/installation/ruby/
[supertest-image]:https://img.shields.io/badge/supertest-7.7.0-black
[supertest-url]:https://github.com/visionmedia/supertest#readme
# Scaffolding generator to test e2e
[![JavaScript Version][javascript-image]][javascript-url]
[![NodeJS Version][nodejs-image]][nodejs-url]
[![Cypress Version][cypress-image]][cypress-url]
[![Cucumber Version][cucumber-image]][cucumber-url]
[![SupertTest Version][supertest-image]][supertest-url]

Estrutura do projeto
```
.
├── dist
├── src
│   ├── index.ts
│   ├── templates
│   │   ├── cypress-with-cucumber
│   │   └── cypress-with-mocha
│   └── utils
│       └── template.ts
├── tsconfig.json
├── package.json
└── README.md
```
## Configurando ambiente local

Assumimos que você já ***possui o NodeJS disponível no terminal***. Agora você precisará do **npm** para baixar todas as dependências dos pacotes do projeto, conforme o arquivo **[package.json](https://github.com/renatosantanaoliveira/e2e-generator-scaffold-testing-js/package.json)**.

Para baixar as dependências de pacote deste projeto abra a pasta "**[raiz](https://github.com/renatosantanaoliveira/e2e-generator-scaffold-testing-js)**" no terminal e execute o comando:
```
npm install
```

Para execução local do scaffolding, após instalar as dependências no terminal execute o comando:
```
npm link
```
O comando acima, vai definir o scaffolding como global na máquina.

Para execução, deve criar uma "pasta do projeto" no diretório de sua escolha e no terminal executar o seguinte comanado:
```
scaffold-testing
```