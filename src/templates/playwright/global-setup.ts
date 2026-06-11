import fs from 'fs';
import path from 'path';
import { envConfig } from './config';

export default async function globalSetup() {
  // Ensure allure-results folder exists so Allure picks up env properties
  const resultsDir = path.resolve(process.cwd(), 'allure-results');
  if (!fs.existsSync(resultsDir)) fs.mkdirSync(resultsDir, { recursive: true });

  const envProps: Record<string, string> = {
    Environment: envConfig.envName,
    BaseURL: envConfig.baseUrl,
    'Node.js': process.version,
  };

  const contents = Object.entries(envProps)
    .map(([k, v]) => `${k}=${v}`)
    .join('\n');

  fs.writeFileSync(path.join(resultsDir, 'environment.properties'), contents, 'utf8');
}
