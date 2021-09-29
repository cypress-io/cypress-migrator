export const defaultText = {
  protractor: `describe('Cypress Docs', () => {
      it('should show the correct site title and redirect url', () => {
        browser.driver.get('https://docs.cypress.io/');
    
        expect(browser.getTitle()).toEqual('Why Cypress? | Cypress Documentation');
        expect(browser.getCurrentUrl()).toEqual('https://docs.cypress.io/guides/overview/why-cypress');
      });
    });`,
}
