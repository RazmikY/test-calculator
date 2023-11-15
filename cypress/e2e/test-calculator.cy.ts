describe('My First Test', () => {
    it('Visits the initial project page', () => {
        cy.visit('/');

        const button = cy.get('#calculate-button');

        cy.get('#operand1').type('25');
        cy.get('#operand2').type('25');

        button.then(btn => {
            expect(btn).be.disabled;
        });

        cy.get('#operation').select('+').should('contain.value', 0);
        cy.get('#operation').select('/').should('contain.value', 1);
        cy.get('#operation').select('%').should('contain.value', 2);

        button.then(btn => {
            expect(btn).not.be.disabled;
        });

        cy.get('#operation').select('');

        button.then(btn => {
            expect(btn).be.disabled;
        });

        cy.get('#operation').select('+').should('contain.value', 0);

        button.click().then(btn => {
            cy.get('#operand1').should('contain.value', '');
            cy.get('#operand2').should('contain.value', '');
            cy.get('#operation').should('contain.value', '');

            expect(btn).be.disabled;
        });

        cy.get('#operand1').type('52');
        cy.get('#operand2').type('4');
        cy.get('#operation').select('/').should('contain.value', 1);

        cy.get('#calculate-button').click();
    });
});
