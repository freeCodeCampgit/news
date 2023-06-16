const commonExpectedMeta = require('../../../fixtures/common-expected-meta.json');
const selectors = {
  errorLink: "[data-test-label='error-link']"
};

describe('404', () => {
  before(() => {
    cy.visit('/testing-testing-1-2/', { failOnStatusCode: false });
  });

  it('should render basic components', () => {
    cy.get('nav').should('be.visible');
    cy.get('.banner').should('be.visible');
    cy.get('footer').should('be.visible');
  });

  it('the error link should point to to the full URL of the landing page', () => {
    cy.get(selectors.errorLink).should(
      'have.attr',
      'href',
      commonExpectedMeta.siteUrl
    );
  });
});
