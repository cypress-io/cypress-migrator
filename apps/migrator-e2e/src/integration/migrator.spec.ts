/// <reference types="cypress" />

interface IMigration {
  protractor: string
  cypress: string
}

const clearProtractor = (): Cypress.Chainable<JQuery<HTMLElement>> => {
  return cy.get('textArea').first().clear().type('{selectall}{backspace}')
}

const enterProtractor = (value: string): void => {
  cy.get('textArea').first().type(value, { parseSpecialCharSequences: false })
}

const expectCypressMigrationToEqual = (value: string): void => {
  cy.get('.view-lines').contains(value)
}

const expectCypressMigrationToBeEmpty = (): void => {
  cy.get('.view-line').first().should('contain', '')
}

const migrate = (): Cypress.Chainable<Element> => cy.getBySel('migrate-button').click()

const verifyMigration = (migration: IMigration): void => {
  clearProtractor()
  enterProtractor(migration.protractor)
  migrate()
  expectCypressMigrationToEqual(migration.cypress)
}

const verifyEmptyMigration = (value: string): void => {
  clearProtractor().type(value)
  migrate()
  expectCypressMigrationToBeEmpty()
}

describe('Migrator app', () => {
  beforeEach(() => {
    cy.visit('/')
  })

  it('correctly displays and migrates', () => {
    // displays logo and nav links correctly
    cy.get('[alt="Cypress Logo"]').click()
    cy.location().should((loc) => {
      expect(loc.pathname).to.eq('/')
    })
    cy.getBySel('nav-list').find('li').should('have.length', 2)

    // correctly selects language
    cy.getBySel('language-select-button').find('option').contains('protractor')
    cy.getBySel('language-select-options').should('have.length', 1)
    cy.getBySel('language-select-button').contains('option', 'protractor')
    // test page elements that are dynamic based on selected language
    cy.getBySel('nav-list').contains('li', 'protractor')
    cy.getBySel('all-migrations-link').contains('span', 'protractor')

    // correctly migrates code
    cy.get('.modified-in-monaco-diff-editor').find('.view-line').should('have.length', 1)
    cy.getBySel('migrate-button').click()

    // shows more details section
    cy.getBySel('more-details').should('be.visible')
    cy.getBySel('more-details').find('h2').should('be.visible')
    cy.getBySel('api-details').find('p').should('be.visible')
    cy.getBySel('api-details-list').find('li').should('have.length', 4)
  })

  it('correctly displays antipattern warning', () => {
    clearProtractor()
    enterProtractor('browser.wait(2000)')
    migrate()
    expectCypressMigrationToEqual('cy.wait(2000)')
    cy.getBySel('error-alert-warning')
      .should('contain', 'Potential Anti-Pattern Found')
      .should('have.class', 'bg-yellow-50')
  })

  it('correctly displays no migration found warning', () => {
    cy.intercept('**/api/migrations', { statusCode: 201, body: { protractor: 'test()', cypress: 'test()' } }).as(
      'migrate',
    )
    clearProtractor()
    enterProtractor('test()')
    migrate()
    expectCypressMigrationToEqual('test()')
    cy.getBySel('error-alert-warning').should('contain', 'No Migrations Found').should('have.class', 'bg-yellow-50')
    cy.getBySel('errorCTAButton').should('contain', 'Submit An Issue').click()
    cy.wait('@migrate').then(() => {
      cy.getBySel('error-alert-warning').should('contain', 'Issue Submission Succeeded')
    })
  })
  it('correctly displays xpath warning', () => {
    clearProtractor()
    enterProtractor("by.xpath('a')")
    migrate()
    expectCypressMigrationToEqual("cy.xpath('a')")
    cy.getBySel('error-alert-warning').should('contain', 'XPath Migration Found').should('have.class', 'bg-yellow-50')
  })

  it('correctly displays error from codemods lib as error', () => {
    clearProtractor()
    migrate()
    cy.get('.view-line').should('have.value', '')
    cy.getBySel('error-alert-error')
      .should('contain', 'Please provide an input value to migrate')
      .should('have.class', 'bg-red-50')
  })

  it('verifies all the selector migrations work', () => {
    cy.fixture('selectors').then((migrations: IMigration[]) => {
      migrations.forEach((migration: IMigration) => verifyMigration(migration))
    })
  })

  it('verifies all the interaction migrations work', () => {
    cy.fixture('interactions').then((migrations: IMigration[]) => {
      migrations.forEach((migration: IMigration) => verifyMigration(migration))
    })
  })

  it('verifies all the browser method migrations work', () => {
    cy.fixture('browser-methods').then((migrations: IMigration[]) => {
      migrations.forEach((migration: IMigration) =>
        migration.cypress === '' ? verifyEmptyMigration(migration.protractor) : verifyMigration(migration),
      )
    })
  })

  it('verifies all the assertion method migrations work', () => {
    cy.fixture('assertions').then((migrations: IMigration[]) => {
      migrations.forEach((migration: IMigration) => verifyMigration(migration))
    })
  })
})
