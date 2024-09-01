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
});

describe('AddPost Component - API Error Handling', () => {
  let mockSetPosts: sinon.SinonStub; // Declare mockSetPosts here

  beforeEach(() => {
    mockSetPosts = cy.stub(); // Initialize the stub in beforeEach
    cy.mount(<AddPost setPosts={mockSetPosts} />);
  });

  it('should display an error message when the API call fails', () => {
    // Intercept the POST request and simulate an error response
    cy.intercept('POST', 'http://localhost:4000/posts', {
      statusCode: 500, // Simulating server error
      body: { message: 'Internal Server Error' }, // Custom error message
    }).as('addPostError');

    // Fill in the AddPost form
    cy.get('input[name="title"]').type('New Post');
    cy.get('input[name="body"]').type('New Body');

    // Submit the form
    cy.get('form').submit();

    // Wait for the POST request to occur
    cy.wait('@addPostError');

    // Assert that the error toast is displayed with the correct message
    cy.contains('Internal Server Error').should('be.visible');
  });

  it('should display a network error message if the network fails', () => {
    // Intercept the POST request and simulate a network error
    cy.intercept('POST', 'http://localhost:4000/posts', {
      forceNetworkError: true, // Simulate a network failure
    }).as('networkError');

    // Fill in the AddPost form
    cy.get('input[name="title"]').type('Another Post');
    cy.get('input[name="body"]').type('This is another post body');

    // Submit the form
    cy.get('form').submit();

    // Wait for the network error to occur
    cy.wait('@networkError');

    // Assert that the network error toast is displayed
    cy.contains('Network error').should('be.visible');
  });
});
