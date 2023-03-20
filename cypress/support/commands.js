Cypress.Commands.add('loginAsStandardUser', (username, password) => {
  cy.get('[name="username"]').clear().type(username);
  cy.get('[name="password"]').clear().type(password, { log: false });
  cy.get('button[type="submit"]').click();
});

Cypress.Commands.add('apiGet', (url) => cy.request({ url, failOnStatusCode: false }));
