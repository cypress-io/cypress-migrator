/* eslint-disable @typescript-eslint/no-var-requires */

import * as jscodeshiftTestUtils from 'jscodeshift/dist/testUtils'
import * as transform from '../../protractor/index'

describe('webdriver', () => {
  const driverMethodsInput = `
  driver.get()
  driver.get(page)
  driver.driver.get('about:blank')
  driver.refresh()
  driver.navigate().forward()
  driver.navigate().back()
  driver.wait(5000)
  driver.getTitle()
  driver.getCurrentUrl()
  driver.setLocation('faq')
  driver.debugger()
  driver.findElement(By.css('.list'))
  // Everything below this is removed via codemods
  driver.restart()
  driver.restartSync()
  driver.ignoreSynchronization = true
  driver.manage().timeouts().implicitlyWait(15000)
  driver.driver.manage().timeouts().setScriptTimeout(55)
  driver.pause()
  driver.getId()
  `

  const driverMethodsOutput = `
  cy.visit()
  cy.visit(page)
  cy.visit('about:blank')
  cy.reload()
  cy.go('forward')
  cy.go('back')
  cy.wait(5000)
  cy.title()
  cy.location('href')
  cy.get('#faq').scrollIntoView()
  cy.debug()
  cy.get('.list')
  `

  // test removing protractor imports codemod
  jscodeshiftTestUtils.defineInlineTest(
    transform,
    {},
    driverMethodsInput,
    driverMethodsOutput,
    'transform driver methods',
  )
})
