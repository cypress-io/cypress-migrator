describe('ElementLocators', () => {
    beforeEach(() => {
      browser.get('index.html#/form')
    })
  
    it('should transform sendKeys', () => {
      const term = 'var test'
      element(by.id('test-form-input')).sendKeys('typing')
      element(by.id('test-form-input')).sendKeys(term)
    })
  
    it('should transform mouseMove', () => {
      browser
        .actions()
        .mouseMove(element(by.id('my-id')))
        .perform()
  
      browser.actions().mouseMove(testElement).perform()
    })
  
    it('should transform click', () => {
      browser
        .actions()
        .click(element(by.id('submit')))
        .perform()
  
      browser.actions().click(testElement).perform()
    })
  
    it('should transform double click', () => {
      browser
        .actions()
        .doubleClick(element(by.className('test-item')))
        .perform()
  
      browser.actions().doubleClick(testElement).perform()
    })
  
    it('should transform takeScreenshot', () => {
      element.takeScreenshot()
      element(by.id('test')).takeScreenshot()
    })
})