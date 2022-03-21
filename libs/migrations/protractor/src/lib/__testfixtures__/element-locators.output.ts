describe('ElementLocators', () => {
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
})