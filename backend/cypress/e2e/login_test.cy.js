describe('Successful Login Test', () => {
    it('logs in the user and redirects to /item_search', () => {
        // Navigate to the login page
        cy.visit('http://localhost:3000/login');

        // Intercept the login API request
        cy.intercept('POST', 'http://localhost:8080/api/auth/login').as('loginRequest');

        // Ensure the login page is visible
        cy.contains('Login').should('be.visible');

        // Fill in the login form
        cy.get('#email').type('testuser@gmail.com');
        cy.get('#password').type('abcd@1234');

        // Submit the form
        cy.get('button').contains('Login').should('not.be.disabled').click();

        // Wait for the login request and assert the response status
        cy.wait('@loginRequest').then((interception) => {
            expect(interception.response.statusCode).to.eq(200);
            cy.log('Login API request was successful.');
        });

        // Verify the redirection to the correct page
        cy.url().should('include', '/item_search');

        // Assert elements on the /item_search page to confirm successful navigation
        cy.contains('HelpingHands').should('be.visible');
        cy.contains('My Requests Only').should('exist');
    });
});
