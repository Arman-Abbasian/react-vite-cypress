import AddPost from '../../src/components/Post/AddPost';
import * as sinon from 'sinon';

describe('AddPost component', () => {
  let mockSetPosts: sinon.SinonStub; // Declare mockSetPosts here

  beforeEach(() => {
    // Initialize the stub inside beforeEach to ensure it resets for each test
    mockSetPosts = cy.stub();

    // Mock the API call for form submission
    cy.intercept('POST', 'http://localhost:4000/posts', { fixture: 'newPost.json' }).as('addPost');
    cy.mount(<AddPost setPosts={mockSetPosts} />);
  });

  it('renders correctly', () => {
    // Check if the form and input fields are rendered
    cy.get('form').should('be.visible');
    cy.get('input[name="title"]').should('be.visible');
    cy.get('input[name="body"]').should('be.visible');
    cy.get('input[type="submit"]').should('be.visible');
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

it('should display an error message on network error', () => {
  // Intercept the POsST request with an error response
  cy.intercept('POST', 'http://localhost:4000/posts', {
    statusCode: 500,
    body: 'Network error'
  }).as('addPostError');

  // Fill out the form
  cy.get('input[name="title"]').type('Test Title');
  cy.get('input[name="body"]').type('Test Body');

  // Submit the form
  cy.get('form').submit();

  // Wait for the POST request to complete
  cy.wait('@addPostError');

  // Check if the error message is displayed
  cy.contains('Network error',{ timeout: 10000 });
})

});