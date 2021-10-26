/// <reference types="cypress" />

describe('Translator app', () => {
  beforeEach(() => {
    cy.visit('/')
  })

  it('correctly displays and translates', () => {
    // displays logo and nav links correctly
    cy.get('[alt="Cypress Logo"]').click()
    cy.location().should((loc) => {
      expect(loc.pathname).to.eq('/')
    })
    cy.getBySel('nav-list').find('li').should('have.length', 2)

    // correctly selects language
    cy.getBySel('language-select-button').find('span').contains('protractor')
    cy.getBySel('language-select-button').click()
    cy.getBySel('language-select-options').should('have.length', 1)
    cy.getBySel('language-select-options').contains('li', 'protractor').click()
    // test page elements that are dynamic based on selected language
    cy.getBySel('nav-list').contains('li', 'protractor')
    cy.getBySel('all-translations-link').contains('span', 'protractor')

    // correctly translates code
    cy.get('.original-in-monaco-diff-editor').find('.view-line').should('have.length', 7)
    cy.get('.modified-in-monaco-diff-editor').find('.view-line').should('have.length', 1)
    cy.getBySel('translate-button').click()
    cy.get('.modified-in-monaco-diff-editor').find('.view-line').should('have.length', 7)

    // shows more details section
    cy.getBySel('more-details').should('be.visible')
    cy.getBySel('more-details').find('h2').should('be.visible')
    cy.getBySel('api-details').find('p').should('be.visible')
    cy.getBySel('api-details-list').find('li').should('have.length', 4)
  })
})
