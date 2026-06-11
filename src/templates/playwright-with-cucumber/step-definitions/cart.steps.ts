import { Given, When, Then } from '@cucumber/cucumber';
import { expect } from '@playwright/test';
import { PlaywrightWorld } from '../support/world';
import dataJson from '../data/login-massa.json';

Given('I am logged in as a standard user', async function (this: PlaywrightWorld) {
  const password = process.env.SAUCE_PASSWORD;
  if (!password) throw new Error('Required env var "SAUCE_PASSWORD" is not set.');
  await this.loginPage.goto();
  await this.loginPage.login(dataJson.standardUser.username, password);
});

When('I add the product {string} to the cart', async function (this: PlaywrightWorld, productId: string) {
  await this.inventoryPage.addProductToCartById(productId);
});

When('I open the product named {string}', async function (this: PlaywrightWorld, productName: string) {
  await this.inventoryPage.clickProductByName(productName);
});

Then('the cart badge should display {string}', async function (this: PlaywrightWorld, count: string) {
  await expect(this.inventoryPage.cartBadge).toHaveText(count);
});

Then('the product title should be {string}', async function (this: PlaywrightWorld, title: string) {
  await expect(this.productPage.productTitle).toHaveText(title);
});

Then('I should be able to add the product to the cart', async function (this: PlaywrightWorld) {
  await this.productPage.addToCart();
});
