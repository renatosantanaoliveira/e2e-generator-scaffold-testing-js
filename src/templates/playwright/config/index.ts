import { qaConfig } from './qa.config';
import { devConfig } from './dev.config';

type EnvConfig = Readonly<{ envName: string; baseUrl: string }>;

const env = (process.env.NODE_ENV ?? 'qa').toLowerCase();

const configMap: Record<string, EnvConfig> = {
  qa: qaConfig,
  dev: devConfig,
};

const selectedConfig = configMap[env];

if (!selectedConfig) {
  throw new Error(`Unknown NODE_ENV "${env}". Available environments: ${Object.keys(configMap).join(', ')}`);
}

export const envConfig: EnvConfig = selectedConfig;

export default envConfig;
