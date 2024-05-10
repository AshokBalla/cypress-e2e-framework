const { Given, When, Then } = require("@badeball/cypress-cucumber-preprocessor");
const LoginPage = require("../../../support/pageObjects/LoginPage");

const loginPage = new LoginPage();

Given("I am on the login page", () => {
    cy.visit("https://www.saucedemo.com/");
    cy.takeScreenshot("login-page");
});

When("I enter the username {string} and password {string}", (username, password) => {
    loginPage.loginToSauceDemo(username, password);
    cy.takeScreenshot("credentials-entered");
});

When("I click on the login button", () => {
    cy.log('Login button already clicked in previous step');
});

Then("I should be logged in successfully", () => {
    cy.url().should('include', '/inventory.html');
    cy.get('.app_logo').should('be.visible');
    cy.takeScreenshot("login-successful");
});

Then("I should see an error message {string}", (errorMessage) => {
    cy.get('[data-test="error"]').should('be.visible').and('contain', errorMessage);
    cy.takeScreenshot("login-error");
}); 