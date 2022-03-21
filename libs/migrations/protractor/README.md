# migrations-protractor

This library was generated with [Nx](https://nx.dev).

## Running unit tests

Run `nx test migrations-protractor` to execute the unit tests via [Jest](https://jestjs.io).

## Running Linting

Run `nx lint migrations-protractor` to run the lint rules.

# Cypress Codemods

This library is a collection of migrations-protractor to help make migrating test files to [Cypress.io](https://docs.cypress.io/guides/overview/why-cypress) easier.

Code is transformed with [jscodeshift](https://github.com/facebook/jscodeshift).

Codemods formulated with help from [AST Explorer](https://astexplorer.net/) and [Jarvis](https://rajasegar.github.io/jarvis/).

## Codemods

### Protractor

You can see a full list of mappings by category at `apps/migrator/markdown/`

#### Async / Await

The following migrations-protractor apply to async/await:

- async will be removed from any class methods
- all await expressions will be removed

#### Classes

The following migrations-protractor apply to classes:

- class method return types will be removed

#### Imports

If a Protractor import is detected in a file, it will be removed.

#### Variables

Sometimes Protractor tests will include selectors set to variables like this:

```javascript
const testElement = by.id('test-element')
```

Using this codemod, these now get wrapped in an arrow function so that they work within Cypress like this:

```javascript
const testElement = () => cy.get('#test-element')
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
