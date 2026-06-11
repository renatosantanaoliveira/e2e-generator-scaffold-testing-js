import { faker } from '@faker-js/faker';

// ToolsQA requires: uppercase + lowercase + digit + special char, min 8 chars
const VALID_PASSWORD = 'Test@12345!';

export const userFactory = {
  build: (overrides = {}) => ({
    userName: faker.internet.username().replace(/[^a-zA-Z0-9_]/g, '') + faker.string.numeric(4),
    password: VALID_PASSWORD,
    ...overrides,
  }),
};
