import App from '../../src/App'

describe('<App />', () => {
  it('mounts', () => {
    cy.mount(<App />)
  })
  it('renders the correct heading text', () => {
    cy.mount(<App />);
    cy.get('h1').should('contain', 'cypress test');
  });
  it('renders the component structure', () => {
    cy.mount(<App />);
    cy.get('div').should('exist');
    cy.get('h1').should('exist');
  });
});

  