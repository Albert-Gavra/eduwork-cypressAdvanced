/// <reference types="cypress" />

describe('Tugas menguji search box dengan keyword "online"', () => {
    before(() => {
        cy.visit('http://zero.webappsecurity.com/index.html')
    });

    it('Should type "online" into searchbox and submit', () => {
        cy.get('#searchTerm').type('online{enter}')
    });

    it('Should show search result page', () => {
        cy.get('a').should('contain.text', 'Zero - Free Access to Online Banking')
        cy.get('a').should('contain.text', 'Zero - Online Statements')
    });
});