# codemods

This library was generated with [Nx](https://nx.dev).

## Running unit tests

Run `nx test codemods` to execute the unit tests via [Jest](https://jestjs.io).

## Running Linting

Run `nx lint codemods` to run the lint rules.

# Cypress Codemods

This library is a collection of codemods to help make migrating test files to [Cypress.io](https://docs.cypress.io/guides/overview/why-cypress) easier.

Code is transformed with [jscodeshift](https://github.com/facebook/jscodeshift).

Codemods formulated with help from [AST Explorer](https://astexplorer.net/) and [Jarvis](https://rajasegar.github.io/jarvis/).

````

## Codemods

### Protractor

#### Selectors

| Before                                       | After                                |
| -------------------------------------------- | ------------------------------------ |
| by.className('thisClass')                    | cy.get('.thisClass')                 |
| by.id('my-id')                               | cy.get('#my-id')                     |
| by.css('.my-class')                          | cy.get('.my-class')                  |
| by.name('field-name')                        | cy.get('input[name="field-name"]')   |
| by.model('user.name')                        | cy.get('[ng-model="user.name"]');    |
| by.binding('value')                          | cy.get('[ng-bind="value"]')          |
| by.options('n in name')                      | cy.get('[ng-options="n in name"]')   |
| by.linkText('Google')                        | cy.get('a').contains('Google')       |
| by.partialLinkText('Goo')                    | cy.get('a').contains('Goo')          |
| by.cssContainingText('.my-class', 'text')    | cy.get('.my-class').contains('text') |
| by.buttonText('Save')                        | cy.get('button').contains('Save')    |
| by.partialButtonText('Save')                 | cy.get('button').contains('Save')    |
| by.tagName('h1')                             | cy.get('h1')                         |
| $('this-example')                            | cy.get('this-example')               |
| $('example').$$('li')                        | cy.get('example').find('li')         |
| $$('li').get(1)                              | cy.get('li').eq(1)                   |
| element(by.css('.an-element'))               | cy.get('.an-element')                |
| element.all(by.css('.list-items'))           | cy.get('.list-items')                |
| el.getAttribute('abc' )                      | el.invoke('attr', 'abc')             |
| testElement.getDriver()                      | testElement.parent()                 |
| $('.parent').getWebElement()                 | cy.get('.parent')                    |
| element(by.css('.my-class')).getWebElement() | cy.get('.my-class')                  |

#### Interactions

| Before                                                                      | After                                       |
| --------------------------------------------------------------------------- | ------------------------------------------- |
| element(by.className('thisClass')).sendKeys('type something')               | cy.get('.thisClass').type('type something') |
| browser.actions().click(element(by.tagName('button'))).perform()            | cy.get('button').click()                    |
| browser.actions().mouseMove(element(by.id('test-id'))).perform()            | cy.get('#test-id').scrollIntoView()         |
| browser.actions().doubleClick(element(by.className('list-item'))).perform() | cy.get('.listItem').dblclick()              |
| element(by.id('test')).takeScreenshot()                                     | cy.get('#test').screenshot()                |
| el.takeScreenshot()                                                         | el.screenshot()                             |

#### Assertions

| Before                                                                 | After                                                         |
| ---------------------------------------------------------------------- | ------------------------------------------------------------- |
| expect(by.className('thisClass').count()).toEqual(3)                   | expect(cy.get('.thisClass').its('length')).should('equal', 3) |
| expect(testObject).toBe({ id: test })                                  | cy.get(testObject).should('deepEqual', { id: test })          |
| expect(by.css('.list').count()).toEqual(3)                             | cy.get('.list').its('length').should('equal', 3)              |
| expect(by.css('.list').count()).not.toEqual(5)                         | cy.get('.list').its('length').should('not.equal', 5)          |
| expect(element(by.css('.list').isDisplayed()).toBeFalse()              | cy.get('.list').should('not.be.visible')                      |
| expect(element.isPresent()).toBeFalse()                                | cy.get(element).should('not.exist')                           |
| expect(element(by.className('test-checkbox').isSelected())).toBe(true) | cy.get('.test-checkbox').should('be.selected')                |
| expect(element(by.className('input-field').isEnabled())).toBe(false)   | cy.get('.input-field').should('not.be.enabled')               |
| expect(element(by.id('user-name')).getText()).toBe('Joe Smith')        | cy.get('#user-name').should('have.text', 'Joe Smith')         |

#### Browser methods

| Before                                              | After                           |
| --------------------------------------------------- | ------------------------------- |
| browser.wait(5000)                                  | cy.wait(5000)                   |
| browser.getTitle()                                  | cy.title()                      |
| browser.getCurrentUrl()                             | cy.location('href')             |
| browser.setLocation('faq')                          | cy.get('#faq').scrollIntoView() |
| browser.refresh()                                   | cy.reload()                     |
| browser.debugger()                                  | cy.debug()                      |
| browser.findElement(by.css('.list'))                | cy.get('.list')                 |
| browser.driver.findElement(by.css('.another-list')) | cy.get('.another-list')         |
| browser.restart()                                   | _Removed from file._            |
| browser.restartSync()                               | _Removed from file._            |
| browser.ignoreSynchronization = true                | _Removed from file._            |
| browser.manage().timeouts().implicitlyWait(15000);  | _Removed from file._            |
| browser.waitForAngular();                           | _Removed from file._            |
| browser.waitForAngularEnabled();                    | _Removed from file._            |
| browser.pause();                                    | _Removed from file._            |
| browser.getId();                                    | _Removed from file._            |

#### Async / Await

The following codemods apply to async/await:

- async will be removed from any class methods
- all await expressions will be removed

#### Classes

The following codemods apply to classes:

- class method return types will be removed

#### Imports

If a Protractor import is detected in a file, it will be removed.

#### Variables

Sometimes Protractor tests will include selectors set to variables like this:

```javascript
const testElement = by.id('test-element');
````

Using this codemod, these now get wrapped in an arrow function so that they work within Cypress like this:

```javascript
const testElement = () => cy.get('#test-element');
```

#### Multiple Browsers

Protractor allows for using multiple browsers in the same test. However, we do not support that functionality at this time. For more information on running your tests across multiple browsers, [click here](https://on.cypress.io/cross-browser-testing).

---

## ESLint

ESLint is configured to static check code and fix syling with Prettier.

Setup:

- Install the [VSCode ESLint extention](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint)
- Update your VSCode settings to allow the ESLint to format code

```sh
 // tell the ESLint plugin to run on save
 "eslint.format.enable": true,
 "editor.codeActionsOnSave": {
       "source.fixAll.eslint": true
 },
 // tell the VSCode to not format on save to avoid conflicts
 "editor.formatOnSave": false,
 "editor.defaultFormatter": "dbaeumer.vscode-eslint",
```
