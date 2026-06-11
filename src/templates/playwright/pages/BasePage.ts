import { type Page } from '@playwright/test';

export class BasePage {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async goto(url: string): Promise<void> {
    await this.page.goto(url, { waitUntil: 'load' });
  }

  async waitForURL(urlOrRegExp: string | RegExp, options?: { timeout?: number }) {
    return this.page.waitForURL(urlOrRegExp, { timeout: options?.timeout });
  }
}
