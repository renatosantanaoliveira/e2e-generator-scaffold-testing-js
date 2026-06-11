@login
Feature: BookStore Login

  As a registered BookStore user
  I want to authenticate using my credentials
  So that I can access my account and books

  Background:
    Given I am on the BookStore login page

  @success
  Scenario: Login with valid credentials grants access to the profile page
    When I enter valid login credentials
    And I submit the login form
    Then I am redirected to the profile page

  @failure
  Scenario: Login with invalid credentials displays an authentication error
    When I enter invalid login credentials
    And I submit the login form
    Then I see the error message "Invalid username or password!"
