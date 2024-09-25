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

  it('should allow the user to delete a post', () => {
    // Intercept the DELETE request when a post is deleted
    cy.intercept('DELETE', 'http://localhost:4000/posts/1', {
      statusCode: 200
    }).as('deletePost');

    // Mock the updated GET request after deleting a post
    cy.intercept('GET', 'http://localhost:4000/posts', {
      statusCode: 200,
      body: [
        { id: '2', title: 'Second Mock Post', body: 'This is the body of the second mock post.' }
      ],
    }).as('updatedPostsAfterDelete');

    // Click the delete button for the first post
    cy.get('#deleteButton-1').click();

    // Wait for the DELETE request to complete
    cy.wait('@deletePost');

    // Wait for the updated GET request after deleting the post
    cy.wait('@updatedPostsAfterDelete');

    // Verify the post is no longer visible
    cy.contains('First Mock Post').should('not.exist');
  });

  it('should allow the user to edit a post', () => {
    // Intercept the PUT request when a post is edited
    cy.intercept('PUT', 'http://localhost:4000/posts/1', {
      statusCode: 200,
      body: { id: '1', title: 'First Mock Post (Edited)', body: 'This is the edited body of the first mock post.' }
    }).as('editPost');

    // Mock the updated GET request after editing the post
    cy.intercept('GET', 'http://localhost:4000/posts', {
      statusCode: 200,
      body: [
        { id: '1', title: 'First Mock Post (Edited)', body: 'This is the edited body of the first mock post. (Edited)'},
        { id: '2', title: 'Second Mock Post', body: 'This is the body of the second mock post.'}
      ],
    }).as('getPostsAfterEdit');

    // Trigger the edit action (for example, if editing opens a modal or a form)
    // Replace this with the actual interaction that triggers editing
    cy.get('[data-testid="1"]').click(); // Assuming there's an edit button for post 1

    // Fill in the new title and body for the post
    cy.get('[data-testid="titleInputEdit"]').clear().type('First Mock Post (Edited)');
    cy.get('[data-testid="titleInputPost"]').clear().type('This is the edited body of the first mock post. (Edited)');

    // Submit the edit form
    cy.get('[data-testid="submitInputEdit"]').click();

    // Wait for the PUT request to be completed
    cy.wait('@editPost');

    // Wait for the updated GET request after editing the post
    cy.wait('@getPostsAfterEdit',{ timeout: 10000 });

    // Verify the post was edited
    cy.contains('First Mock Post (Edited)').should('be.visible');
  });

});
