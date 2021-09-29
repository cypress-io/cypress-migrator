## Interactions

| Before                                                                      | After                                       |
| --------------------------------------------------------------------------- | ------------------------------------------- |
| element(by.className('thisClass')).sendKeys('type something')               | cy.get('.thisClass').type('type something') |
| browser.actions().click(element(by.tagName('button'))).perform()            | cy.get('button').click()                    |
| browser.actions().mouseMove(element(by.id('test-id'))).perform()            | cy.get('#test-id').scrollIntoView()         |
| browser.actions().doubleClick(element(by.className('list-item'))).perform() | cy.get('.listItem').dblclick()              |
| element(by.id('test')).takeScreenshot()                                     | cy.get('#test').screenshot()                |
| el.takeScreenshot()                                                         | el.screenshot()                             |
