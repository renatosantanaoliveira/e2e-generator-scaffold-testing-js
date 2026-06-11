@allure.label.parentSuite:Login
Feature: Login
  As a registered user
  I want to authenticate on Sauce Demo
  So that I can access the product inventory

  Background:
    Given I am on the login page

  @smoke
  Scenario: Successfully log in with valid credentials
    When I log in as "standard_user"
    Then I should be redirected to the inventory page
    And the inventory container should be visible

  @regression
  Scenario: Reject login with invalid credentials
    When I log in with invalid credentials
    Then I should see the login error "Epic sadface: Username and password do not match any user in this service"
    And I should remain on the login page

  @regression
  Scenario: Reject login with a valid username and wrong password
    When I log in as "standard_user" with an invalid password
    Then I should see the login error "Epic sadface: Username and password do not match any user in this service"
    And I should remain on the login page

  @regression
  Scenario: Require username when only password is provided
    When I submit the login form with only a password
    Then I should see the login error "Epic sadface: Username is required"
    And I should remain on the login page

  @regression
  Scenario: Require password when only username is provided
    When I submit the login form with only a username
    Then I should see the login error "Epic sadface: Password is required"
    And I should remain on the login page

  @regression
  Scenario: Require credentials when the form is submitted empty
    When I submit the login form without any credentials
    Then I should see the login error "Epic sadface: Username is required"
    And I should remain on the login page

  @regression
  Scenario: Reject login for a locked-out user
    When I log in as "locked_out_user"
    Then I should see the login error "Epic sadface: Sorry, this user has been locked out."
    And I should remain on the login page
