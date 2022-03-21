export const exampleInput = `
  describe('Google Search', () => {
    it('should show the correct site title', () => {
      const input = element(by.name('search-input'))
      const button = element(by.css('#search-button'))
  
      browser.driver.get('https://google.com/')
      input.sendKeys('BrowserStack')
      button.click()
  
      expect(browser.getTitle()).toEqual('BrowserStack - Google Search')
    })
  })
  
  describe('Protractor Demo App', () => {
    it('should add one and two', () => {
      browser.get('http://juliemr.github.io/protractor-demo/')
      element(by.model('first')).sendKeys(1)
      element(by.model('second')).sendKeys(2)
      element(by.id('gobutton')).click()
  
      expect(element(by.id('total')).getText()).toBe('3')
    })
  })
`

export const exampleOutput = `
  describe('Google Search', () => {
    it('should show the correct site title', () => {
      const input = () => cy.get('input[name="search-input"]')
      const button = () => cy.get('#search-button')
  
      cy.visit('https://google.com/')
      input.type('BrowserStack')
      button.click()
  
      cy.title().should('equal', 'BrowserStack - Google Search')
    })
  })
  
  describe('Protractor Demo App', () => {
    it('should add one and two', () => {
      cy.visit('http://juliemr.github.io/protractor-demo/')
      cy.get('[ng-model="first"]').type(1)
      cy.get('[ng-model="second"]').type(2)
      cy.get('#gobutton').click()
  
      cy.get('#total').should('have.text', '3')
    })
  })
`