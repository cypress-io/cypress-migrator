/// <reference types="cypress" />

interface ITranslation {
  protractor: string
  cypress: string
}

const clearProtractor = (): Cypress.Chainable<JQuery<HTMLElement>> => {
  return cy.get('textArea').first().clear().type('{selectall}{backspace}')
}

const enterProtractor = (value: string): void => {
  cy.get('textArea').first().type(value, { parseSpecialCharSequences: false })
}

const expectCypressTranslationToEqual = (value: string): void => {
  cy.get('.view-lines').contains(value)
}

const expectCypressTranslationToBeEmpty = (): void => {
  cy.get('.view-line').first().should('contain', '')
}

const translate = (): Cypress.Chainable<Element> => cy.getBySel('translate-button').click()

const verifyTranslation = (translation: ITranslation): void => {
  clearProtractor()
  enterProtractor(translation.protractor)
  translate()
  expectCypressTranslationToEqual(translation.cypress)
}

const verifyEmptyTranslation = (value: string): void => {
  clearProtractor().type(value)
  translate()
  expectCypressTranslationToBeEmpty()
}

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
    clearProtractor()
    enterProtractor('browser.wait(2000)')
    translate()
    expectCypressTranslationToEqual('cy.wait(2000)')
    cy.getBySel('error-alert-warning')
      .should('contain', 'Potential Anti-Pattern Found')
      .should('have.class', 'bg-yellow-50')
  })

  it('correctly displays no translation found warning', () => {
    cy.intercept('/api/translation', { statusCode: 201, body: { protractor: 'test()', cypress: 'test()' } }).as(
      'translate',
    )
    clearProtractor()
    enterProtractor('test()')
    translate()
    expectCypressTranslationToEqual('test()')
    cy.getBySel('error-alert-warning').should('contain', 'No Translations Found').should('have.class', 'bg-yellow-50')
    cy.getBySel('errorCTAButton').should('contain', 'Submit An Issue').click()
    cy.wait('@translate').then(() => {
      cy.getBySel('error-alert-warning').should('contain', 'Issue Submission Succeeded')
    })
  })
  it('correctly displays xpath warning', () => {
    clearProtractor()
    enterProtractor("by.xpath('a')")
    translate()
    expectCypressTranslationToEqual("cy.xpath('a')")
    cy.getBySel('error-alert-warning').should('contain', 'XPath Translation Found').should('have.class', 'bg-yellow-50')
  })

  it('correctly displays error from codemods lib as error', () => {
    clearProtractor()
    translate()
    cy.get('.view-line').should('have.value', '')
    cy.getBySel('error-alert-error')
      .should('contain', 'Please provide an input value to translate')
      .should('have.class', 'bg-red-50')
  })

  it('verifies all the selector translations work', () => {
    cy.fixture('selectors').then((translations: ITranslation[]) => {
      translations.forEach((translation: ITranslation) => verifyTranslation(translation))
    })
  })

  it('verifies all the interaction translations work', () => {
    cy.fixture('interactions').then((translations: ITranslation[]) => {
      translations.forEach((translation: ITranslation) => verifyTranslation(translation))
    })
  })

  it('verifies all the browser method translations work', () => {
    cy.fixture('browser-methods').then((translations: ITranslation[]) => {
      translations.forEach((translation: ITranslation) =>
        translation.cypress === '' ? verifyEmptyTranslation(translation.protractor) : verifyTranslation(translation),
      )
    })
  })

  it('verifies all the assertion method translations work', () => {
    cy.fixture('assertions').then((translations: ITranslation[]) => {
      translations.forEach((translation: ITranslation) => verifyTranslation(translation))
    })
  })
})
