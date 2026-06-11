import { type Page, type Locator } from '@playwright/test';
import { BasePage } from './BasePage';

export class InventoryPage extends BasePage {
  readonly url = '/inventory.html';
  readonly inventoryContainer: Locator;
  readonly cartBadge: Locator;

  constructor(page: Page) {
    super(page);
    this.inventoryContainer = this.page.getByTestId('inventory-container');
    this.cartBadge = this.page.getByTestId('shopping-cart-badge');
  }

  async goto(): Promise<void> {
    await super.goto(this.url);
  }

  async isVisible(): Promise<boolean> {
    return this.inventoryContainer.isVisible();
  }

  async addProductToCartById(productId: string): Promise<void> {
    await this.page.locator(`#add-to-cart-${productId}`).click();
  }

  async clickProductByName(productName: string): Promise<void> {
    await this.page.getByTestId('inventory-item-name').filter({ hasText: productName }).click();
  }

  async getCartCount(): Promise<number> {
    if (!(await this.cartBadge.isVisible())) {
      return 0;
    }
    const countText = await this.cartBadge.textContent();
    return Number(countText?.trim() ?? '0');
  }
}
