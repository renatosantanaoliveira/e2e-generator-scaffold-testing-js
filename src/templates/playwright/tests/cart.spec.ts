import { test, expect } from '../fixtures/page-fixtures';

test.describe('Cart', () => {
  /**
   * Scenario: Add two products to the cart from the inventory page.
   *
   * Given a standard user is authenticated
   * When the user adds the first and second configured products to the cart
   * Then the cart badge should display two items
   *
   * @tags smoke
   */
  test('Should add two products to the cart', { tag: '@smoke' }, async ({ loginPage, inventoryPage, data }) => {
    await loginPage.goto();
    await loginPage.login(data.standardUser.username, data.standardUser.password);

    await inventoryPage.addProductToCartById(data.products.firstProduct.id);
    await inventoryPage.addProductToCartById(data.products.secondProduct.id);

    await expect(inventoryPage.cartBadge).toHaveText('2');
  });

  /**
   * Scenario: Open a product details page from inventory and add it to the cart.
   *
   * Given a standard user is authenticated
   * When the user opens the first configured product by name
   * Then the product details title should match the selected product
   * And the product should be available to add to the cart
   *
   * @tags smoke
   */
  test('Should open the first product, verify the title and add it to the cart', { tag: '@smoke' }, async ({ loginPage, inventoryPage, productPage, data }) => {
    await loginPage.goto();
    await loginPage.login(data.standardUser.username, data.standardUser.password);

    await inventoryPage.clickProductByName(data.products.firstProduct.name);

    await expect(productPage.productTitle).toHaveText(data.products.firstProduct.name);
    await productPage.addToCart();
  });
});
