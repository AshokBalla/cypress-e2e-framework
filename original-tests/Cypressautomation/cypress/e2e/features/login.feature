Feature: Login Functionality

    As a user
    I want to be able to log in to the application
    So that I can access my account

    @Regression
    Scenario: Successful login with valid credentials
        Given I am on the login page
        When I enter the username "standard_user" and password "secret_sauce"
        And I click on the login button
        Then I should be logged in successfully

    @Smoke
    Scenario: Failed login with invalid credentials
        Given I am on the login page
        When I enter the username "invalid_user" and password "invalid_password"
        And I click on the login button
        Then I should see an error message "Epic sadface: Username and password do not match any user in this service" 