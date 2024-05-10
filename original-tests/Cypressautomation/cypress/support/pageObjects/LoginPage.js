class LoginPage {
    loginToOrangeHRM(username, password) {
        cy.get('#txtUsername').type(username)
        cy.get('#txtPassword').type(password)
        cy.get('#btnLogin').click()
    }

    loginToSauceDemo(username, password) {
        cy.get('#user-name').type(username)
        cy.get('#password').type(password)
        cy.get('#login-button').click()
    }

    // General login method that can be adapted based on site
    login(username, password, site = 'orangehrm') {
        if (site === 'saucedemo') {
            this.loginToSauceDemo(username, password);
        } else {
            this.loginToOrangeHRM(username, password);
        }
    }
}

module.exports = LoginPage;