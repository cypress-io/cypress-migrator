/// <reference types="cypress" />

describe('Translator app', () => {
  beforeEach(() => {
    cy.visit('/')
  })

  it('displays logo and nav links correctly', () => {
    cy.get('[alt="Cypress Logo"]').click()
    cy.location().should((loc) => {
      expect(loc.pathname).to.eq('/')
    })
    cy.getBySel('nav-list').find('li').should('have.length', 2)
  })

  it('can select language to be translated', () => {
    cy.getBySel('language-select-button').find('span').contains('protractor')
    cy.getBySel('language-select-button').click()
    cy.getBySel('language-select-options').should('have.length', 1)
    cy.getBySel('language-select-options').select('protractor')

    // test page elements that are dynamic based on selected language
    cy.getBySel('nav-list').find('li').first().contains('protractor')
    cy.getBySel('all-translations-link').find('span').contains('protractor')
  })

  it('can correctly translate code and show more information', () => {
    cy.get('.original-in-monaco-diff-editor').find('.view-line').should('have.length', 7)
    cy.get('.modified-in-monaco-diff-editor').find('.view-line').should('have.length', 1)
    cy.getBySel('translate-button').click()
    cy.get('.modified-in-monaco-diff-editor').find('.view-line').should('have.length', 7)

    // more details section
    cy.getBySel('more-details').should('be.visible')
    cy.getBySel('more-details').find('h2').should('be.visible')
    cy.getBySel('api-details').find('p').should('be.visible')
    cy.getBySel('api-details-list').find('li').should('have.length', 4)
    // cy.getBySel('api-details-list').find('li').first().should('contain', 'visit')
    // cy.getBySel('api-details-list').find('').first().should('have.attr', 'href', 'https://on.cypress.io/visit')
  })
})
