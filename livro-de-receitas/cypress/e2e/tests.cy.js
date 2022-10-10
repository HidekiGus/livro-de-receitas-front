describe('Tests basic buttons usage', () => {
  it('Clicks on register and then on login button', () => {
    cy.visit('http://localhost:3000/');
    cy.get('#data-login').should('exist');
    cy.get('#data-login-to-signup').should('exist');
    cy.get('#data-login-to-signup').click();
    cy.url().should('eq', 'http://localhost:3000/signup');
    cy.get('#data-signup').should('exist');
    cy.get('#data-signup-to-login').should('exist');
    cy.get('#data-signup-to-login').click();
    cy.url().should('eq', 'http://localhost:3000/');
  });
});
