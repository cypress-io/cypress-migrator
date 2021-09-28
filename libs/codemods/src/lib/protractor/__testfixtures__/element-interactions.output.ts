describe('ElementLocators', () => {
    beforeEach(() => {
      cy.visit('index.html#/form');
    });
  
    it('should transform sendKeys', () => {
      const term = 'var test';
      cy.get('#test-form-input').type('typing');
      cy.get('#test-form-input').type(term);
    });
  
    it('should transform mouseMove', () => {
      cy.get('#my-id').scrollIntoView();
  
      cy.get(testElement).scrollIntoView();
    });
  
    it('should transform click', () => {
      cy.get('#submit').click();
  
      cy.get(testElement).click();
    });
  
    it('should transform double click', () => {
      cy.get('.test-item').dblclick();
  
      cy.get(testElement).dblclick();
    });
  
    it('should transform takeScreenshot', () => {
      element.screenshot();
      cy.get('#test').screenshot();
    });
  });
  