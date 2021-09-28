export class TestPageObject {
  testPrivateMethod() {
    return cy.get('.private-class');
  }

  testProtectedMethod() {
    return cy.get('.protected-class');
  }

  search(term: string) {
    const input = () => cy.get('input[name="search-input"]');
    input.clear();
    input.type(term);
    cy.get('#submit-search').click();
  }

  testClassName() {
    return cy.get('.test-class');
  }

  testId() {
    return cy.get('#test-id');
  }

  testTagName() {
    return cy.get('h1');
  }

  testDollarSign() {
    return cy.get('test-element');
  }

  testName() {
    return cy.get('input[name="field-name"]');
  }

  testElementAll() {
    return cy.get('.test-class');
  }
}
