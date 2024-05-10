import LoginPage from '../../support/pageObjects/LoginPage';

describe("My First Test", function () {
    let loginPage;

    before(function () {
        loginPage = new LoginPage();
        cy.fixture('example').then(function (data) {
            this.data = data;
        });
    });

    it('My first test case', function () {

        cy.visit(Cypress.env('url'));
        loginPage.login(this.data.username, this.data.password);

        // Verify login was successful
        cy.get('#welcome').should('be.visible').click();
        cy.get('a[href="/symfony/web/index.php/auth/logout"]').click();
    });
});