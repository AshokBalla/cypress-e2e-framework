// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

// Import commands.js using CommonJS syntax:
import 'cypress-mochawesome-reporter/register';

// Custom command to take screenshot
Cypress.Commands.add('takeScreenshot', (name) => {
    if (Cypress.config('screenshotOnRunFailure')) {
        cy.screenshot(name);
    }
});

// Custom command to log step for better reporting
Cypress.Commands.add('logStep', (message) => {
    cy.task('log', message);
    cy.log(message);
});

// Custom command for BDD Given steps
Cypress.Commands.add('givenStep', (message) => {
    cy.logStep(`Given ${message}`);
});

// Custom command for BDD When steps
Cypress.Commands.add('whenStep', (message) => {
    cy.logStep(`When ${message}`);
});

// Custom command for BDD Then steps
Cypress.Commands.add('thenStep', (message) => {
    cy.logStep(`Then ${message}`);
});

// Import tag filter utility
require('./tag-filter');