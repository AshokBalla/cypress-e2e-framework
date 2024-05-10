describe('Test for screenshot verification', function () {
    it('Should generate a screenshot on failure', function () {
        cy.visit(Cypress.env('url'));

        // This will fail because the element doesn't exist
        cy.get('#non-existent-element', { timeout: 2000 }).should('be.visible');
    });
}); 