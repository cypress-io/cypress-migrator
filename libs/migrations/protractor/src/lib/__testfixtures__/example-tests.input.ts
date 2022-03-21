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