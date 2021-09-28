describe('Google Search', () => {
    it('should show the correct site title', () => {
      const input = () => cy.get('input[name="search-input"]');
      const button = () => cy.get('#search-button');
  
      cy.visit('https://google.com/');
      input.type('BrowserStack');
      button.click();
  
      cy.title().should('equal', 'BrowserStack - Google Search');
    });
  });
  
  describe('Protractor Demo App', () => {
    it('should add one and two', () => {
      cy.visit('http://juliemr.github.io/protractor-demo/');
      cy.get('[ng-model="first"]').type(1);
      cy.get('[ng-model="second"]').type(2);
      cy.get('#gobutton').click();
  
      cy.get('#total').should('have.text', '3');
    });
  });
  