@login
Feature: Log-In

    I as a user of the bookstore
    I want to login in store
    To carry out my purchases

    @success
    Scenario: Log-In successfully
        Given that I am on the login page
        When I input username and password
        And click in button "Login"
        Then log-in will be successfully

    @unsuccessfully
    Scenario: Log-In without successfully
        Given that I am on the login page
        When I input username and password invalid
        And click in button "Login"
        Then return message error on screen