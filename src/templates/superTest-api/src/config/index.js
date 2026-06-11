import dotenv from 'dotenv';
import { env as qaEnv } from '../../config/qa.js';
import { env as devEnv } from '../../config/dev.js';

dotenv.config();

const ENV = process.env.ENV ?? 'qa';

const envConfigs = {
  qa: qaEnv,
  dev: devEnv,
};

const envConfig = envConfigs[ENV];

if (!envConfig) {
  throw new Error(`Ambiente desconhecido: "${ENV}". Opções válidas: ${Object.keys(envConfigs).join(', ')}`);
}

export const config = {
  ...envConfig,
  timeout: Number(process.env.TEST_TIMEOUT ?? 10000),
};
