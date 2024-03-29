## Assertions

| Before                                                                 | After                                                 |
| ---------------------------------------------------------------------- | ----------------------------------------------------- |
| expect(by.className('thisClass').count()).toEqual(3)                   | cy.get('.thisClass').its('length').should('equal', 3) |
| expect(testPageObject).toBe({ id: test })                              | testPageObject.should('deepEqual', { id: test })      |
| expect(by.css('.list').count()).toEqual(3)                             | cy.get('.list').its('length').should('equal', 3)      |
| expect(by.css('.list').count()).not.toEqual(5)                         | cy.get('.list').its('length').should('not.equal', 5)  |
| expect(element(by.css('.list')).isDisplayed()).toBeFalse()             | cy.get('.list').should('not.be.visible')              |
| expect(by.className('thisClass').isPresent()).toBeFalse()              | cy.get('.thisClass').should('not.exist')              |
| expect(element(by.className('test-checkbox').isSelected())).toBe(true) | cy.get('.test-checkbox').should('be.selected')        |
| expect(element(by.className('input-field').isEnabled())).toBe(false)   | cy.get('.input-field').should('not.be.enabled')       |
| expect(element(by.id('user-name')).getText()).toBe('Joe Smith')        | cy.get('#user-name').should('have.text', 'Joe Smith') |
| element.all(by.css('.list-item')).get(3)                               | cy.get('.list-item').eq(3)                            |
