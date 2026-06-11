import { Before, After, BeforeAll, setDefaultTimeout, ITestCaseHookParameter } from '@cucumber/cucumber';
import { chromium, selectors } from '@playwright/test';
import fs from 'fs';
import path from 'path';
import { PlaywrightWorld } from './world';
import { LoginPage, InventoryPage, ProductPage } from '../pages';
import { envConfig } from '../config';

const isDebug  = process.env.PWDEBUG === '1';
const isHeaded = isDebug || process.env.HEADED === '1';

setDefaultTimeout(isDebug ? 300_000 : 30_000);
selectors.setTestIdAttribute('data-test');

BeforeAll(function () {
  // ── .env ────────────────────────────────────────────────────────────────────
  const envPath = path.resolve(process.cwd(), '.env');
  if (fs.existsSync(envPath)) {
    const content = fs.readFileSync(envPath, { encoding: 'utf8' });
    for (const line of content.split(/\r?\n/)) {
      const match = line.match(/^\s*([\w.-]+)\s*=\s*(.*)?\s*$/);
      if (!match) continue;
      const key = match[1];
      let value = match[2] ?? '';
      if (value.startsWith('"') && value.endsWith('"')) value = value.slice(1, -1);
      if (value.startsWith("'") && value.endsWith("'")) value = value.slice(1, -1);
      if (process.env[key] === undefined) process.env[key] = value;
    }
  }

  // ── Allure results dir ───────────────────────────────────────────────────────
  const resultsDir = path.resolve(process.cwd(), 'allure-results');

  // Limpa resultados acumulados de runs anteriores preservando o histórico de trend
  if (fs.existsSync(resultsDir)) {
    for (const entry of fs.readdirSync(resultsDir)) {
      if (entry === 'history') continue;
      fs.rmSync(path.join(resultsDir, entry), { recursive: true, force: true });
    }
  } else {
    fs.mkdirSync(resultsDir, { recursive: true });
  }

  // ── environment.properties ──────────────────────────────────────────────────
  fs.writeFileSync(
    path.join(resultsDir, 'environment.properties'),
    [
      `Environment=${envConfig.envName}`,
      `Base URL=${envConfig.baseUrl}`,
      `Node.js=${process.version}`,
      `Browser=Chromium`,
      `Framework=Cucumber + Playwright`,
    ].join('\n'),
    'utf8',
  );

  // ── categories.json ─────────────────────────────────────────────────────────
  // Sem messageRegex: cada categoria captura TODOS os testes com aquele status.
  // "Falha de produto"       → status failed  (asserção quebrada — bug no produto)
  // "Falha de infraestrutura"→ status broken  (erro/timeout — problema no teste/ambiente)
  // "Cenários ignorados"     → status skipped
  // "Testes aprovados"       → status passed  (garante que a aba nunca fica vazia)
  fs.writeFileSync(
    path.join(resultsDir, 'categories.json'),
    JSON.stringify(
      [
        { name: 'Testes aprovados',          matchedStatuses: ['passed']  },
        { name: 'Falha de produto',           matchedStatuses: ['failed']  },
        { name: 'Falha de infraestrutura',    matchedStatuses: ['broken']  },
        { name: 'Cenários ignorados',         matchedStatuses: ['skipped'] },
      ],
      null,
      2,
    ),
    'utf8',
  );

  // ── executor.json ───────────────────────────────────────────────────────────
  const isCI   = process.env.GITHUB_ACTIONS === 'true';
  const executor = isCI
    ? {
        name:        'GitHub Actions',
        type:        'github',
        url:         `${process.env.GITHUB_SERVER_URL}/${process.env.GITHUB_REPOSITORY}`,
        buildOrder:  Number(process.env.GITHUB_RUN_NUMBER) || 1,
        buildName:   `${process.env.GITHUB_WORKFLOW} #${process.env.GITHUB_RUN_NUMBER}`,
        buildUrl:    `${process.env.GITHUB_SERVER_URL}/${process.env.GITHUB_REPOSITORY}/actions/runs/${process.env.GITHUB_RUN_ID}`,
        reportName:  'Allure Report',
      }
    : {
        name:       'Local',
        type:       'local',
        buildName:  `Local — ${envConfig.envName} — ${new Date().toISOString().slice(0, 16).replace('T', ' ')}`,
        reportName: 'Allure Report',
      };

  fs.writeFileSync(
    path.join(resultsDir, 'executor.json'),
    JSON.stringify(executor, null, 2),
    'utf8',
  );
});

Before(async function (this: PlaywrightWorld, _scenario: ITestCaseHookParameter) {
  this.browser = await chromium.launch({
    headless: !isHeaded,
    slowMo: isHeaded && !isDebug ? 300 : 0,
  });
  this.context = await this.browser.newContext({ baseURL: envConfig.baseUrl });
  this.page = await this.context.newPage();
  this.loginPage  = new LoginPage(this.page);
  this.inventoryPage = new InventoryPage(this.page);
  this.productPage   = new ProductPage(this.page);
});

After(async function (this: PlaywrightWorld) {
  await this.context?.close();
  await this.browser?.close();
});
