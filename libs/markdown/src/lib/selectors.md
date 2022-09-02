### Selectors

| Before                                       | After                                    |
| -------------------------------------------- | ---------------------------------------- |
| by.className('thisClass')                    | cy.get('.thisClass')                     |
| by.id('my-id')                               | cy.get('#my-id')                         |
| by.css('.my-class')                          | cy.get('.my-class')                      |
| by.name('field-name')                        | cy.get('input[name="field-name"]')       |
| by.model('user.name')                        | cy.get('[ng-model="user.name"]');        |
| by.binding('value')                          | cy.get('[ng-bind="value"]')              |
| by.options('n in name')                      | cy.get('[ng-options="n in name"]')       |
| by.linkText('Google')                        | cy.contains('a', 'Google')           |
| by.partialLinkText('Goo')                    | cy.contains('a', 'Goo')              |
| by.cssContainingText('.my-class', 'text')    | cy.contains('.my-class', 'text')     |
| by.buttonText('Save')                        | cy.contains('button', 'Save')        |
| by.partialButtonText('Save')                 | cy.contains('button', 'Save')        |
| by.tagName('h1')                             | cy.get('h1')                             |
| by.xpath('//ul[@class="todo-list"]//li')     | cy.xpath('//ul[@class="todo-list"]//li') |
| $('this-example')                            | cy.get('this-example')                   |
| $('example').$$('li')                        | cy.get('example').find('li')             |
| $$('li').get(1)                              | cy.get('li').eq(1)                       |
| element(by.css('.an-element'))               | cy.get('.an-element')                    |
| element.all(by.css('.list-items'))           | cy.get('.list-items')                    |
| el.getAttribute('abc')                       | cy.get(el).invoke('attr', 'abc')         |
| testElement.getDriver()                      | testElement.parent()                     |
| $('.parent').getWebElement()                 | cy.get('.parent')                        |
| element(by.css('.my-class')).getWebElement() | cy.get('.my-class')                      |
