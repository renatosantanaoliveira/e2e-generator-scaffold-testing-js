@allure.label.parentSuite:Cart
Feature: Cart
  As a logged-in user
  I want to add products to the shopping cart
  So that I can proceed to checkout

  Background:
    Given I am logged in as a standard user

  @smoke
  Scenario: Add two products to the cart from the inventory
    When I add the product "sauce-labs-backpack" to the cart
    And I add the product "sauce-labs-bike-light" to the cart
    Then the cart badge should display "2"

  @smoke
  Scenario: Open product details and add the product to the cart
    When I open the product named "Sauce Labs Backpack"
    Then the product title should be "Sauce Labs Backpack"
    And I should be able to add the product to the cart
