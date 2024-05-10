const LoginPage = require('../../support/pageObjects/LoginPage');

/**
 * BDD-Style Test for Login Functionality
 * 
 * Feature: Login Functionality
 *
 * As a user
 * I want to be able to log in to the application
 * So that I can access my account
 */
describe('Login Functionality', function () {
    let loginPage;

    beforeEach(function () {
        loginPage = new LoginPage();
    });

    /**
     * @Smoke
     * Scenario: Successful login with valid credentials
     *   Given I am on the login page
     *   When I enter the username "standard_user" and password "secret_sauce"
     *   And I click on the login button
     *   Then I should be logged in successfully
     */
    it('Successful login with valid credentials @Smoke', function () {
        // Given I am on the login page
        cy.visit('https://www.saucedemo.com/');

        // When I enter the username "standard_user" and password "secret_sauce"
        // And I click on the login button
        loginPage.loginToSauceDemo('standard_user', 'secret_sauce');

        // Then I should be logged in successfully
        cy.url().should('include', '/inventory.html');
        cy.get('.app_logo').should('be.visible');
    });

    /**
     * Scenario: Failed login with invalid credentials
     *   Given I am on the login page
     *   When I enter the username "invalid_user" and password "invalid_password"
     *   And I click on the login button
     *   Then I should see an error message
     */
    it('Failed login with invalid credentials', function () {
        // Given I am on the login page
        cy.visit('https://www.saucedemo.com/');

        // When I enter the username "invalid_user" and password "invalid_password"
        // And I click on the login button
        loginPage.loginToSauceDemo('invalid_user', 'invalid_password');

        // Then I should see an error message
        cy.get('[data-test="error"]').should('be.visible')
            .and('contain', 'Epic sadface: Username and password do not match any user in this service');
    });
}); 