class LoginPage {
  visit() { cy.visit('/web/index.php/auth/login'); }
  submit(username, password) { cy.loginAsStandardUser(username, password); }
}

module.exports = new LoginPage();
