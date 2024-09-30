
// cypress/integration/postManagement.spec.ts
describe('Post Management End-to-End Test', () => {

  beforeEach(() => {
    cy.visit('/')
    
    //Mock the initial GET request for fetching posts
    cy.intercept('GET', 'http://localhost:4000/posts', {
      statusCode: 200,
      body: [
        { id: '1', title: 'First Mock Post', body: 'This is the body of the first mock post.' },
        { id: '2', title: 'Second Mock Post', body: 'This is the body of the second mock post.' },
      ],
    }).as('getPosts');

    // Wait for the initial posts to load
    cy.wait('@getPosts');
  });
  //------------------------------- 
  it('should toggle the theme when the button is clicked', () => {
    // The default theme is 'light'
   cy.get('[data-testid="appContainer"]').should('have.css', 'background-color', 'rgb(255, 255, 255)'); // white background
  
    // Click the theme toggle button (adjust selector as necessary)
    cy.get('svg').click(); // Assuming the theme toggle is an icon like CiLight or CiDark
  
    // After clicking, the theme should change to 'dark'
    cy.get('body').should('have.css', 'background-color', 'rgba(0, 0, 0, 0)'); // black background
  });
  //-------------------------------

  it('should allow the user to add a new post', () => {
    // Fill in the form to add a new post
    cy.get('input[name="title"]').type('title added');
    cy.get('input[name="body"]').type('body added');

    // Intercept the POST request and mock the response
    cy.intercept('POST', 'http://localhost:4000/posts', {
      statusCode: 201, // Mock successful post creation
      body: { id: '3', title: 'title added', body: 'body added' }, // Mock new post response
    }).as('addPost');

    // Intercept the GET request that follows to fetch updated posts
    cy.intercept('GET', 'http://localhost:4000/posts', {
      statusCode: 200,
      body: [
        { id: '1', title: 'First Mock Post', body: 'This is the body of the first mock post.' },
        { id: '2', title: 'Second Mock Post', body: 'This is the body of the second mock post.' },
        { id: '3', title: 'title added', body: 'body added' }, // Newly added post in mock data
      ],
    }).as('updatedPosts');

    // Submit the form
    cy.get('input[type="submit"]').click();

    // Wait for the POST request to be completed (this is now mocked)
    cy.wait('@addPost');

    // Wait for the updated GET request after adding the post
    cy.wait('@updatedPosts');

    // Check that the new post is displayed
    cy.contains('title added').should('be.visible');
  });

  it('should allow the user to delete a post', () => {
    // Intercept the DELETE request when a post is deleted
    cy.intercept('DELETE', 'http://localhost:4000/posts/1', {
      statusCode: 200,
    }).as('deletePost');

    // Mock the updated GET request after deleting a post
    cy.intercept('GET', 'http://localhost:4000/posts', {
      statusCode: 200,
      body: [
        { id: '2', title: 'Second Mock Post', body: 'This is the body of the second mock post.' },
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
      body: { id: '1', title: 'First Mock Post (Edited)', body: 'This is the edited body of the first mock post.' },
    }).as('editPost');

    // Mock the updated GET request after editing the post
    cy.intercept('GET', 'http://localhost:4000/posts', {
      statusCode: 200,
      body: [
        { id: '1', title: 'First Mock Post (Edited)', body: 'This is the edited body of the first mock post.' },
        { id: '2', title: 'Second Mock Post', body: 'This is the body of the second mock post.' },
      ],
    }).as('getPostsAfterEdit');

    // Trigger the edit action (for example, if editing opens a modal or a form)
    cy.get('[data-testid="edit-button-1"]').click(); // Updated selector for clarity

    // Fill in the new title and body for the post
    cy.get('[data-testid="titleInputEdit"]').clear().type('First Mock Post (Edited)');
    cy.get('[data-testid="bodyInputEdit"]').clear().type('This is the edited body of the first mock post.');

    // Submit the edit form
    cy.get('[data-testid="submitInputEdit"]').click();

    // Wait for the PUT request to be completed
    cy.wait('@editPost');

    // Wait for the updated GET request after editing the post
    cy.wait('@getPostsAfterEdit', { timeout: 10000 });

    // Verify the post was edited
    cy.contains('First Mock Post (Edited)').should('be.visible');
  });
});
