describe('Login Test', () => {
    it('should log in successfully and redirect', () => {
        // Navigate to the login page
        cy.visit('http://localhost:3000/login');

        // Fill in the form
        cy.get('input[type="email"]').type('italiya5981@gmail.com');
        cy.get('input[type="password"]').type('abcd@1234');

        // Click login
        cy.get('button').contains('Login').click();

        // Verify redirection to the post-login page
        cy.url().should('include', '/item_search');
    });
});
