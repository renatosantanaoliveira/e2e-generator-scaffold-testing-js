import { test as base, expect } from '@playwright/test';
import { LoginPage, InventoryPage, ProductPage } from '../pages';
import dataJson from '../data/login-massa.json';

type UserCredentials = {
  username: string;
  password: string;
};

type TestMessages = {
  invalidCredentials: string;
  usernameRequired: string;
  passwordRequired: string;
  lockedOut: string;
};

type ProductData = {
  id: string;
  name: string;
};

type TestData = {
  standardUser: UserCredentials;
  lockedOutUser: UserCredentials;
  invalidUser: UserCredentials;
  invalidPassword: string;
  products: {
    firstProduct: ProductData;
    secondProduct: ProductData;
  };
  messages: TestMessages;
};

type PagesFixtures = {
  loginPage: LoginPage;
  inventoryPage: InventoryPage;
  productPage: ProductPage;
  data: TestData;
};

function requireEnv(key: string): string {
  const value = process.env[key];
  if (!value?.trim()) {
    throw new Error(
      `Required env var "${key}" is not set. Copy .env.example to .env and fill in the values, or set the secret in CI.`
    );
  }
  return value;
}

const testData: TestData = {
  standardUser: { username: dataJson.standardUser.username, password: requireEnv('SAUCE_PASSWORD') },
  lockedOutUser: { username: dataJson.lockedOutUser.username, password: requireEnv('SAUCE_PASSWORD') },
  invalidUser: { username: dataJson.invalidUser.username, password: requireEnv('SAUCE_PASSWORD') },
  invalidPassword: requireEnv('INVALID_PASSWORD'),
  products: dataJson.products,
  messages: dataJson.messages,
};

export const test = base.extend<PagesFixtures>({
  loginPage: async ({ page }, use) => {
    await use(new LoginPage(page));
  },

  inventoryPage: async ({ page }, use) => {
    await use(new InventoryPage(page));
  },

  productPage: async ({ page }, use) => {
    await use(new ProductPage(page));
  },

  data: async ({}, use) => {
    await use(testData);
  },
});

export { expect };
