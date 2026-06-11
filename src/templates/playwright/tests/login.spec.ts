import type { LoginPage } from '../pages';
import { test, expect } from '../fixtures/page-fixtures';

test.describe('Login', () => {
  test.beforeEach(async ({ loginPage }) => {
    await loginPage.goto();
  });

  /**
   * Assert the login form remains on the login page and displays the expected
   * validation or authentication error message.
   *
   * @param loginPage Page object that exposes the login page state.
   * @param expectedMessage Error message expected for the attempted login.
   */
  const expectLoginError = async (loginPage: LoginPage, expectedMessage: string) => {
    await expect(loginPage.errorMessage).toHaveText(expectedMessage);
    await expect(loginPage.page).toHaveURL(loginPage.url);
  };

  test.describe('Happy path', () => {
    /**
     * Scenario: Authenticate with valid standard user credentials.
     *
     * Given the login page is available
     * When the user submits valid standard credentials
     * Then the user should be redirected to the inventory page
     * And the inventory page should be visible
     *
     * @tags smoke
     */
    test('Should log in with valid user credentials', { tag: '@smoke' }, async ({ page, loginPage, inventoryPage, data }) => {
      await loginPage.login(data.standardUser.username, data.standardUser.password);

      await expect(page).toHaveURL(/\/inventory\.html$/);
      await expect(inventoryPage.inventoryContainer).toBeVisible();
    });
  });

  test.describe('Edge cases', () => {
    /**
     * Scenario: Reject login with invalid user credentials.
     *
     * Given the login page is available
     * When the user submits an invalid username and password
     * Then the login page should display the invalid credentials error
     * And the user should remain on the login page
     *
     * @tags regression
     */
    test('Should not log in with invalid user credentials', { tag: '@regression' }, async ({ loginPage, data }) => {
      await loginPage.login(data.invalidUser.username, data.invalidUser.password);

      await expectLoginError(loginPage, data.messages.invalidCredentials);
    });

    /**
     * Scenario: Reject login with a valid user and invalid password.
     *
     * Given the login page is available
     * When the user submits a valid username with an invalid password
     * Then the login page should display the invalid credentials error
     * And the user should remain on the login page
     *
     * @tags regression
     */
    test('Should not log in with an invalid password', { tag: '@regression' }, async ({ loginPage, data }) => {
      await loginPage.login(data.standardUser.username, data.invalidPassword);

      await expectLoginError(loginPage, data.messages.invalidCredentials);
    });

    /**
     * Scenario: Validate username required message.
     *
     * Given the login page is available
     * When the user submits the form with password only
     * Then the login page should display the username required error
     * And the user should remain on the login page
     *
     * @tags regression
     */
    test('Should not log in without a username', { tag: '@regression' }, async ({ loginPage, data }) => {
      await loginPage.fillPassword(data.standardUser.password);
      await loginPage.clickLogin();

      await expectLoginError(loginPage, data.messages.usernameRequired);
    });

    /**
     * Scenario: Validate password required message.
     *
     * Given the login page is available
     * When the user submits the form with username only
     * Then the login page should display the password required error
     * And the user should remain on the login page
     *
     * @tags regression
     */
    test('Should not log in without a password', { tag: '@regression' }, async ({ loginPage, data }) => {
      await loginPage.fillUsername(data.standardUser.username);
      await loginPage.clickLogin();

      await expectLoginError(loginPage, data.messages.passwordRequired);
    });

    /**
     * Scenario: Validate empty login form submission.
     *
     * Given the login page is available
     * When the user submits the form without username and password
     * Then the login page should display the username required error first
     * And the user should remain on the login page
     *
     * @tags regression
     */
    test('Should not log in without username and password', { tag: '@regression' }, async ({ loginPage, data }) => {
      await loginPage.clickLogin();

      await expectLoginError(loginPage, data.messages.usernameRequired);
    });

    /**
     * Scenario: Reject authentication for a locked-out user.
     *
     * Given the login page is available
     * When a locked-out user submits valid locked-out credentials
     * Then the login page should display the locked-out user error
     * And the user should remain on the login page
     *
     * @tags regression
     */
    test('Should not log in as a locked-out user', { tag: '@regression' }, async ({ loginPage, data }) => {
      await loginPage.login(data.lockedOutUser.username, data.lockedOutUser.password);

      await expectLoginError(loginPage, data.messages.lockedOut);
    });
  });
});
