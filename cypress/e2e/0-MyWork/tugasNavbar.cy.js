/// <reference types="cypress" />

describe('Navbar test', () => {
    before(() => {
        cy.visit('http://zero.webappsecurity.com/index.html')
    });
    
    it('Should display online banking content', () => {
        cy.get('#onlineBankingMenu').click()
        cy.url().should('include', 'online-banking.html')
        cy.get('h1').should('be.visible').and('contain.text', 'Online Banking')
    });

    it('Should display feedback content', () => {
        cy.get('#feedback').click()
        cy.url().should('include', 'feedback.html')
        cy.get('h3').should('be.visible').and('contain.text', 'Feedback')
    });

    it('Should display homepage content', () => {
        cy.contains('Zero Bank').click()
        cy.url().should('include', 'index.html')
        cy.get('p').should('be.visible').and('contain.text', 'Welcome to Zero Online Banking.')
    });
});