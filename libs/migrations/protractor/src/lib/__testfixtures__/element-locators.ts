export const elementLocatorsInput = `
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

  it('should transform get', () => {
    element.all(by.css('.list-item')).get(3)
  })
`

export const elementLocatorsOutput = `
  beforeEach(() => {
    cy.visit('index.html#/form')
  })

  it('should transform by.className', () => {
    cy.get('.test-class')
    cy.get('.test-class')
    cy.get('.test-class')
  })

  it('should transform by.id', () => {
    cy.get('#test')
    cy.get('#test')
    cy.get('#test')
  })

  it('should transform by.css', () => {
    cy.get('.test')
    cy.get('.test')
    cy.get('.test')
  })

  it('should transform by.name', () => {
    cy.get('input[name="field-name"]')
    cy.get('input[name="field-name"]')
    cy.get('input[name="field-name"]')
  })

  it('should transform by.tagName', () => {
    cy.get('h1')
    cy.get('h1')
    cy.get('h1')
  })

  it('should transform $', () => {
    cy.get('.this-example')
    cy.get('.this-example')
    cy.get('.this-example')
    const example = () => cy.get('.this-example')
  })

  it('should transform $$', () => {
    cy.get('.items-example')
    cy.get('.items-example')
    const example = () => cy.get('.items-example')
    // Transform chained $$
    cy.get('.parent').find('li')
    cy.get('.list-item').eq(1)
  })

  it('should transform buttonText', () => {
    cy.get('button').contains('Submit')
    cy.get('button').contains('Submit')
    cy.get('button').contains('Submit')
  })

  it('should transform partialButtonText', () => {
    cy.get('button').contains('Subm')
    cy.get('button').contains('Subm')
    cy.get('button').contains('Subm')
  })

  it('should transform linkText', () => {
    cy.get('a').contains('click')
    cy.get('a').contains('click')
    cy.get('a').contains('click')
  })

  it('should transform partialLinkText', () => {
    cy.get('a').contains('cli')
    cy.get('a').contains('cli')
    cy.get('a').contains('cli')
  })

  it('should transform model', () => {
    cy.get('[ng-model="user.name"]')
    cy.get('[ng-model="user.name"]')
  })

  it('should transform getAttribute', () => {
    cy.get(el).invoke('attr', 'abc')
  })

  it('should transform binding', () => {
    cy.get('[ng-bind="name"]')
    cy.get('[ng-bind="name"]')
  })

  it('should transform getDriver()', () => {
    testElement.parent()
    cy.get('.test').parent()
  })

  it('should transform cssContainingText()', () => {
    cy.get('.my-class').contains('text')
    cy.get('.my-class').contains('text')
  })

  it('should transform options', () => {
    cy.get('[ng-options="n in names"]')
    cy.get('[ng-options="n in names"]')
  })

  it('should transform getWebElement', () => {
    cy.get('.parent')
    cy.get('.my-class')
  })

  it('should transform xpath', () => {
    cy.xpath('//ul[@class="todo-list"]//li')
    cy.xpath('//ul[@class="todo-list"]//li')
  })

  it('should transform get', () => {
    cy.get('.list-item').eq(3)
  })
`