/* eslint-disable @typescript-eslint/no-var-requires */
// const defineTest = require('jscodeshift/dist/testUtils').defineTest;
// const defineInlineTest = require('jscodeshift/dist/testUtils').defineInlineTest;
// const transform = require('../index.ts');

import * as jscodeshiftTestUtils from 'jscodeshift/dist/testUtils';
import * as transform from '../index';

describe('protractor', () => {
  const browserMethodsInput = `
  browser.get()
  browser.get(page)
  browser.driver.get('about:blank')
  browser.refresh()
  browser.navigate().forward()
  browser.navigate().back()
  browser.wait(5000)
  browser.getTitle()
  browser.getCurrentUrl()
  browser.setLocation('faq')
  browser.debugger()
  browser.findElement(by.css('.list'))
  browser.driver.findElement(by.css('.list'))
  // Everything below this is removed via codemods
  browser.restart()
  browser.restartSync()
  browser.ignoreSynchronization = true
  browser.manage().timeouts().implicitlyWait(15000)
  browser.driver.manage().timeouts().setScriptTimeout(55)
  browser.waitForAngular()
  browser.waitForAngularEnabled()
  browser.pause()
  browser.getId()
  `;

  const browserMethodsOutput = `
  cy.visit()
  cy.visit(page)
  cy.visit('about:blank')
  cy.reload()
  cy.go('forward')
  cy.go('back')
  // Refer to https://on.cypress.io/wait for more information.
  cy.wait(5000)
  cy.title()
  cy.location('href')
  cy.get('#faq').scrollIntoView()
  cy.debug()
  cy.get('.list')
  cy.get('.list')
  `;

  // test removing protractor imports codemod
  jscodeshiftTestUtils.defineInlineTest(
    transform,
    {},
    browserMethodsInput,
    browserMethodsOutput,
    'transform browser methods'
  );

  jscodeshiftTestUtils.defineTest(__dirname, '.', null, 'assertions', {
    parser: 'ts',
  });
  jscodeshiftTestUtils.defineTest(__dirname, '.', null, 'element-locators', {
    parser: 'ts',
  });
  jscodeshiftTestUtils.defineTest(
    __dirname,
    '.',
    null,
    'element-interactions',
    {
      parser: 'ts',
    }
  );
  jscodeshiftTestUtils.defineTest(__dirname, '.', null, 'page-object', {
    parser: 'ts',
  });
  jscodeshiftTestUtils.defineTest(__dirname, '.', null, 'example-tests', {
    parser: 'ts',
  });
});
