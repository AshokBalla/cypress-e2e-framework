const LoginPage = require('../../support/pageObjects/LoginPage');

describe('SauceDemo Login Tests', function () {
    let loginPage;

    beforeEach(function () {
        loginPage = new LoginPage();
    });

    it('Should login successfully with valid credentials @Smoke @Regression', function () {
        // Visit the SauceDemo website
        cy.visit('https://www.saucedemo.com/');

        // Login using the Page Object Model
        loginPage.loginToSauceDemo('standard_user', 'secret_sauce');

        // Verify successful login
        cy.url().should('include', '/inventory.html');
        cy.get('.app_logo').should('be.visible');

        // Logout
        cy.get('#react-burger-menu-btn').click();
        cy.get('#logout_sidebar_link').should('be.visible').click();
    });

    it('Should display error message with invalid credentials @Regression', function () {
        // Visit the SauceDemo website
        cy.visit('https://www.saucedemo.com/');

        // Login with invalid credentials
        loginPage.loginToSauceDemo('invalid_user', 'invalid_password');

        // Verify error message
        cy.get('[data-test="error"]').should('be.visible')
            .and('contain', 'Epic sadface: Username and password do not match any user in this service');
    });
}); 