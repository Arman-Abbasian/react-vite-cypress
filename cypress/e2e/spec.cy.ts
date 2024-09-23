describe('Post Management End-to-End Test', () => {
  
  beforeEach(() => {
    // Mock the initial GET request for fetching posts
    cy.intercept('GET', 'http://localhost:4000/posts', {
      statusCode: 200,
      body: [
        { id: '1', title: 'First Mock Post', body: 'This is the body of the first mock post.' },
        { id: '2', title: 'Second Mock Post', body: 'This is the body of the second mock post.' }
      ],
    }).as('getPosts');
  
    // Visit the app and wait for the initial posts to load
    cy.visit('/');
    cy.wait('@getPosts');
  });
  
  it('should allow the user to add a new post', () => {
    // Fill in the form to add a new post
    cy.get('input[name="title"]').type('title 4');
    cy.get('input[name="body"]').type('body 4');
  
    // Intercept the POST request when the form is submitted
    cy.intercept('POST', 'http://localhost:4000/posts').as('addPost');
  
    // Intercept the GET request that follows to fetch updated posts
    cy.intercept('GET', 'http://localhost:4000/posts', {
      statusCode: 200,
      body: [
        { id: '1', title: 'First Mock Post', body: 'This is the body of the first mock post.' },
        { id: '2', title: 'Second Mock Post', body: 'This is the body of the second mock post.' },
        { id: '3', title: 'title 4', body: 'body 4' } // Newly added post
      ],
    }).as('updatedPosts');
  
    // Submit the form
    cy.get('input[type="submit"]').click();
  
    // Wait for the POST request to be completed
    cy.wait('@addPost');
  
    // Wait for the updated GET request after adding the post
    cy.wait('@updatedPosts');
  
    // Check that the new post is displayed
    cy.contains('title 4').should('be.visible');
  });
});
