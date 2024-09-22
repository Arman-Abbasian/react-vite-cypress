describe('template spec', () => {
  it('passes', () => {
    cy.visit('http://localhost:5173');
    cy.get('[data-testid="appTitle"]').should('exist').should('have.text','cypress test')
  })
  it('rendered the two title', () => {
    cy.visit('http://localhost:5173');
    cy.get('[data-testid="0"]').should('exist');
    cy.get('[data-testid="1"]').should('exist')
  })
})