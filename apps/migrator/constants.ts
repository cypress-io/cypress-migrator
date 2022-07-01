export const defaultText = {
  protractor: `describe('Cypress Docs', () => {
  it('should show the correct site title and redirect url', () => {
    browser.driver.get('https://docs.cypress.io/');
    expect(browser.getTitle()).toEqual('Why Cypress? | Cypress Documentation');
    expect(browser.getCurrentUrl()).toEqual('https://docs.cypress.io/guides/overview/why-cypress');
  });
});`,
}

export const cypressDocsURL = 'https://on.cypress.io/docs'
export const protractorDocsURL = 'https://on.cypress.io/protractor-to-cypress'
export const migratorIssuesURL = 'https://github.com/cypress-io/cypress-migrator/issues'
export const API_URL = 'https://api.github.com/repos/cypress-io/cypress-migrator/issues'
