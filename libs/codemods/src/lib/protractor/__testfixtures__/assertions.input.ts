describe('Assertions', () => {
  it('should transform count()', () => {
    expect(by.css('.list').count()).toEqual(3)
    expect(element.all(by.options('n in names')).count()).toEqual(3)
  })

  it('should transform toBe()', () => {
    expect(testObject).toBe({ id: test })
  })

  it('should transform count correctly', () => {
    expect(by.css('.list').count()).toEqual(3)
    expect(by.css('.list').count()).not.toEqual(5)
  })

  it('should transform isDisplayed()', () => {
    expect(element(by.css('.list')).isDisplayed()).toBeFalse()
    expect(element(by.css('.another-list')).isDisplayed()).toBeTrue()
    expect(testElement.isDisplayed()).toBeTrue()
    expect(anotherElement.isDisplayed()).toBe(false)
  })

  it('should transform isPresent()', () => {
    expect(element(by.css('.list')).isPresent()).toBeFalse()
    expect(element(by.binding('person.name')).isPresent()).toBe(true)
    expect(element.isPresent()).toBe(false)
  })

  it('should transform isSelected()', () => {
    expect(element(by.className('test-checkbox')).isSelected()).toBeFalse()
    expect(element(by.className('test-checkbox')).isSelected()).toBe(true)
    expect(element(by.id('test-checkbox')).isSelected()).toBe(true)
    expect(element.isSelected()).toBeTrue()
  })

  it('should transform isEnabled()', () => {
    expect(element(by.className('test-input')).isEnabled()).toBe(false)
    expect(element.isEnabled()).toBeTrue()
  })

  it('should transform getText()', () => {
    expect(element(by.id('user-name')).getText()).toBe('Joe Smith')
  })

  it('should transform browser assertions', () => {
    expect(browser.getCurrentUrl()).toEqual('https://docs.cypress.io/guides/overview/why-cypress')
  })
})
