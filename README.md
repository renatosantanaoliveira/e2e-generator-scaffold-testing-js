[javascript-image]: https://img.shields.io/badge/javascript-ES6-orange
[javascript-url]: https://262.ecma-international.org/6.0/
[nodejs-image]: https://img.shields.io/badge/nodejs-14.x-green
[nodejs-url]: https://nodejs.org/en/docs/
[cypress-image]:https://img.shields.io/badge/cypress-10.6.0-beige
[cypress-url]:https://docs.cypress.io/guides/overview/why-cypress
[cucumber-image]: https://img.shields.io/badge/cucumber-12.0.1-brightgreen
[cucumber-url]: https://github.com/badeball/cypress-cucumber-preprocessor
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
│   │   ├── cypress-with-mocha
│   │   └── superTest-api
│   └── utils
│       └── template.ts
├── tsconfig.json
├── package.json
└── README.md
```
## Configurando ambiente local

### Pré-requisitos
- **Node.js 14.x** ou superior ([Download](https://nodejs.org/))
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
1. **Qual template deseja usar?** (cypress-with-cucumber, cypress-with-mocha ou superTest-api)
2. **Qual o nome do seu projeto?**

Depois disso, o scaffolding vai:
- Criar uma pasta com o nome do seu projeto
- Copiar todos os arquivos do template selecionado
- Preencer os campos dinâmicos (como o nome do projeto)
- Instalar todas as dependências automaticamente

Pronto! Sua estrutura de testes está criada e pronta para desenvolvimento! 🎉

### Desenvolvimento do Scaffolding (para contribuidores)

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
