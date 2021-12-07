// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************

// eslint-disable-next-line @typescript-eslint/no-namespace
declare namespace Cypress {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  interface Chainable<Subject> {
    login(email: string, password: string): void
    getBySel(selector: string): Chainable<Element>
    getBySelLike(selector: string): Chainable<Element>
  }
}

Cypress.Commands.add('getBySel', (selector: string, ...args): Cypress.CanReturnChainable => {
  return cy.get(`[data-test=${selector}]`, ...args)
})

Cypress.Commands.add('getBySelLike', (selector: string, ...args): Cypress.CanReturnChainable => {
  return cy.get(`[data-test*=${selector}]`, ...args)
})
