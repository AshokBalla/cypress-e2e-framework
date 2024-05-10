describe('My First Test', function() {
  it('Does not do much!', function() {

    cy.visit('http://orangehrm.qedgetech.com/')
    expect(true).to.equal(true)
    cy.get('#txtUsername').type('Admin')
    cy.get('#txtPassword').type('Qedge123!@#')
    cy.get('#btnLogin').click()
    expect(true).to.equal(true)
    cy.get('#welcome').click()
    cy.get('a[href="/symfony/web/index.php/auth/logout"]').click()
    
  })

})