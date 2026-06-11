const common = {
  paths: ['features/**/*.feature'],
  require: ['support/**/*.ts', 'step-definitions/**/*.ts'],
  requireModule: ['ts-node/register'],
  format: [
    'progress-bar',
    'html:cucumber-report/index.html',
    'json:cucumber-report/report.json',
    'allure-cucumberjs/reporter',
  ],
  formatOptions: {
    snippetInterface: 'async-await',
    resultsDir: 'allure-results',
    // Mapeamento de tags Gherkin para labels do Allure
    // Permite usar @allure.label.<nome>:<valor> nas features
    labels: [
      { pattern: [/@allure\.label\.parentSuite/], name: 'parentSuite' },
      { pattern: [/@allure\.label\.suite/],       name: 'suite'       },
      { pattern: [/@allure\.label\.subSuite/],    name: 'subSuite'    },
      { pattern: [/@allure\.label\.epic/],        name: 'epic'        },
      { pattern: [/@allure\.label\.story/],       name: 'story'       },
      { pattern: [/@allure\.id/],                 name: 'ALLURE_ID'   },
    ],
  },
};

module.exports = {
  default: common,
  smoke: { ...common, tags: '@smoke' },
  regression: { ...common, tags: '@regression' },
};
