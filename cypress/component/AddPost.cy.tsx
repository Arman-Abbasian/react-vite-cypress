import AddPost from '../../src/components/Post/AddPost';

describe('AddPost component', () => {
  beforeEach(() => {
    // Mock the API call for form submission
    cy.intercept('POST', 'http://localhost:4000/posts', { fixture: 'newPost.json' }).as('addPost');
    cy.mount(<AddPost />);
  });

  it('renders correctly', () => {
    // Check if the form and input fields are rendered
    cy.get('form').should('be.visible');
    cy.get('input[name="title"]').should('be.visible');
    cy.get('input[name="body"]').should('be.visible');
    cy.get('input[type="submit"]').should('be.visible');
  });

  it('allows typing into input fields', () => {
    // Type into the input fields and check their values
    cy.get('input[name="title"]').type('title 1000').should('have.value', 'title 1000');
    cy.get('input[name="body"]').type('body 1000').should('have.value', 'body 1000');
  });

  it('submits the form and resets input fields', () => {
    // Type into the input fields
    cy.get('input[name="title"]').type('Test Title');
    cy.get('input[name="body"]').type('Test Body');

    // Submit the form
    cy.get('form').submit();

    // Wait for the API call to complete
    cy.wait('@addPost');

    // Check if the input fields are reset
    cy.get('input[name="title"]').should('have.value', '');
    cy.get('input[name="body"]').should('have.value', '');
  });
})