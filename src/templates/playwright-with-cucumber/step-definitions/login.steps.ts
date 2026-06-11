import { Given, When, Then } from '@cucumber/cucumber';
import { expect } from '@playwright/test';
import { PlaywrightWorld } from '../support/world';
import dataJson from '../data/login-massa.json';

const userMap: Record<string, string> = {
  standard_user: dataJson.standardUser.username,
  locked_out_user: dataJson.lockedOutUser.username,
};

function requireEnv(key: string): string {
  const value = process.env[key];
  if (!value) throw new Error(`Required env var "${key}" is not set.`);
  return value;
}

Given('I am on the login page', async function (this: PlaywrightWorld) {
  await this.loginPage.goto();
});

When('I log in as {string}', async function (this: PlaywrightWorld, userKey: string) {
  const username = userMap[userKey];
  if (!username) throw new Error(`Unknown user key: "${userKey}". Available: ${Object.keys(userMap).join(', ')}`);
  await this.loginPage.login(username, requireEnv('SAUCE_PASSWORD'));
});

When('I log in as {string} with an invalid password', async function (this: PlaywrightWorld, userKey: string) {
  const username = userMap[userKey];
  if (!username) throw new Error(`Unknown user key: "${userKey}".`);
  await this.loginPage.login(username, requireEnv('INVALID_PASSWORD'));
});

When('I log in with invalid credentials', async function (this: PlaywrightWorld) {
  await this.loginPage.login(dataJson.invalidUser.username, requireEnv('SAUCE_PASSWORD'));
});

When('I submit the login form with only a password', async function (this: PlaywrightWorld) {
  await this.loginPage.fillPassword(requireEnv('SAUCE_PASSWORD'));
  await this.loginPage.clickLogin();
});

When('I submit the login form with only a username', async function (this: PlaywrightWorld) {
  await this.loginPage.fillUsername(dataJson.standardUser.username);
  await this.loginPage.clickLogin();
});

When('I submit the login form without any credentials', async function (this: PlaywrightWorld) {
  await this.loginPage.clickLogin();
});

Then('I should be redirected to the inventory page', async function (this: PlaywrightWorld) {
  await expect(this.page).toHaveURL(/\/inventory\.html$/);
});

Then('the inventory container should be visible', async function (this: PlaywrightWorld) {
  await expect(this.inventoryPage.inventoryContainer).toBeVisible();
});

Then('I should see the login error {string}', async function (this: PlaywrightWorld, expectedMessage: string) {
  await expect(this.loginPage.errorMessage).toHaveText(expectedMessage);
});

Then('I should remain on the login page', async function (this: PlaywrightWorld) {
  await expect(this.page).toHaveURL(this.loginPage.url);
});
