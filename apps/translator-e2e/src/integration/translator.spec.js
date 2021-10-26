/// <reference types="cypress" />

// Temporary reverse function until we get the monaco-editor to stop reversing the users typed input
const reverse = (value) => value.split('').reverse().join('')

const enterProtractor = (value) => {
  cy.get('textarea').first().clear().type('{selectall}').type('{backspace}').type(reverse(value))
}

const expectCypressTranslationToEqual = (value) => {
  cy.get('.view-line').contains(value)
}

const translate = () => cy.getBySel('translate-button').click()

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
    //cy.get('.original-in-monaco-diff-editor').find('.view-line').should('have.length', 7)
    cy.get('.modified-in-monaco-diff-editor').find('.view-line').should('have.length', 1)
    cy.getBySel('translate-button').click()
    //cy.get('.modified-in-monaco-diff-editor').find('.view-line').should('have.length', 7)

    // shows more details section
    cy.getBySel('more-details').should('be.visible')
    cy.getBySel('more-details').find('h2').should('be.visible')
    cy.getBySel('api-details').find('p').should('be.visible')
    cy.getBySel('api-details-list').find('li').should('have.length', 4)
  })

  it('correctly displays antipattern warning', () => {
    enterProtractor('browser.wait(2000)')
    translate()
    expectCypressTranslationToEqual('cy.wait(2000)')
    cy.getBySel('error-alert-warning')
      .should('contain', 'Potential Anti-Pattern Found')
      .should('have.class', 'bg-yellow-50')
  })

  it('correctly displays no translation found warning', () => {
    enterProtractor('test(')
    translate()
    expectCypressTranslationToEqual('test()')
    cy.getBySel('error-alert-warning').should('contain', 'No Translations Found').should('have.class', 'bg-yellow-50')
  })

  it('correctly displays error from codemods lib as error', () => {
    cy.get('textarea').first().clear().type('{selectall}').type('{backspace}')
    translate()
    cy.get('.view-line').should('have.value', '')
    cy.getBySel('error-alert-error')
      .should('contain', 'Please provide an input value to translate')
      .should('have.class', 'bg-red-50')
  })
})
