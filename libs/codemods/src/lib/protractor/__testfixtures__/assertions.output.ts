describe('Assertions', () => {
  it('should transform count()', () => {
    cy.get('.list').its('length').should('equal', 3)
    todoList.its('length').should('equal', 3)
    cy.get('[ng-options="n in names"]').its('length').should('equal', 3)
  })

  it('should transform toBe()', () => {
    testObject.should('deepEqual', { id: test })
  })

  it('should transform count correctly', () => {
    cy.get('.list').its('length').should('equal', 3)
    cy.get('.list').its('length').should('not.equal', 5)
  })

  it('should transform isDisplayed()', () => {
    cy.get('.list').should('not.be.visible')
    cy.get('.another-list').should('be.visible')
    testElement.should('be.visible')
    anotherElement.should('not.be.visible')
  })

  it('should transform isPresent()', () => {
    cy.get('.list').should('not.exist')
    cy.get('[ng-bind="person.name"]').should('exist')
    element.should('not.exist')
  })

  it('should transform isSelected()', () => {
    cy.get('.test-checkbox').should('not.be.selected')
    cy.get('.test-checkbox').should('be.selected')
    cy.get('#test-checkbox').should('be.selected')
    element.should('be.selected')
  })

  it('should transform isEnabled()', () => {
    cy.get('.test-input').should('not.be.enabled')
    element.should('be.enabled')
  })

  it('should transform getText()', () => {
    cy.get('#user-name').should('have.text', 'Joe Smith')
  })

  it('should transform browser assertions', () => {
    cy.location('href').should('equal', 'https://docs.cypress.io/guides/overview/why-cypress')
  })
})
