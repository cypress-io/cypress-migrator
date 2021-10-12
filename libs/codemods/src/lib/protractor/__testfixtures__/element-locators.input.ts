describe('ElementLocators', () => {
  beforeEach(() => {
    browser.get('index.html#/form')
  })

  it('should transform by.className', () => {
    by.className('test-class')
    element(by.className('test-class'))
    element.all(by.className('test-class'))
  })

  it('should transform by.id', () => {
    by.id('test')
    element(by.id('test'))
    element.all(by.id('test'))
  })

  it('should transform by.css', () => {
    by.css('.test')
    element(by.css('.test'))
    element.all(by.css('.test'))
  })

  it('should transform by.name', () => {
    by.name('field-name')
    element(by.name('field-name'))
    element.all(by.name('field-name'))
  })

  it('should transform by.tagName', () => {
    by.tagName('h1')
    element(by.tagName('h1'))
    element.all(by.tagName('h1'))
  })

  it('should transform $', () => {
    $('.this-example')
    element($('.this-example'))
    element.all($('.this-example'))
    const example = $('.this-example')
  })

  it('should transform $$', () => {
    $$('.items-example')
    element($$('.items-example'))
    const example = $$('.items-example')
    // Transform chained $$
    $('.parent').$$('li')
    $$('.list-item').get(1)
  })

  it('should transform buttonText', () => {
    by.buttonText('Submit')
    element(by.buttonText('Submit'))
    element.all(by.buttonText('Submit'))
  })

  it('should transform partialButtonText', () => {
    by.partialButtonText('Subm')
    element(by.partialButtonText('Subm'))
    element.all(by.partialButtonText('Subm'))
  })

  it('should transform linkText', () => {
    by.linkText('click')
    element(by.linkText('click'))
    element.all(by.linkText('click'))
  })

  it('should transform partialLinkText', () => {
    by.partialLinkText('cli')
    element(by.partialLinkText('cli'))
    element.all(by.partialLinkText('cli'))
  })

  it('should transform model', () => {
    by.model('user.name')
    element(by.model('user.name'))
  })

  it('should transform getAttribute', () => {
    el.getAttribute('abc')
  })

  it('should transform binding', () => {
    by.binding('name')
    element(by.binding('name'))
  })

  it('should transform getDriver()', () => {
    testElement.getDriver()
    element(by.css('.test')).getDriver()
  })

  it('should transform cssContainingText()', () => {
    by.cssContainingText('.my-class', 'text')
    element(by.cssContainingText('.my-class', 'text'))
  })

  it('should transform options', () => {
    by.options('n in names')
    element.all(by.options('n in names'))
  })

  it('should transform getWebElement', () => {
    $('.parent').getWebElement()
    element(by.css('.my-class')).getWebElement()
  })

  it('should transform xpath', () => {
    by.xpath('//ul[@class="todo-list"]//li')
    element(by.xpath('//ul[@class="todo-list"]//li'))
  })
})
