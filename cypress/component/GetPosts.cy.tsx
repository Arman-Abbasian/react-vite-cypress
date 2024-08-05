import GetPosts from '../../src/components/Post/GetPosts';

describe('GetPosts component', () => {
  it('renders correctly', () => {
    cy.mount(<GetPosts />);
    // Add assertions to verify the rendered content
    cy.contains('h1', 'posts').should('be.visible');
    cy.get('li').should('have.length.greaterThan', 0);
  });
});

  //mock the api
  describe('GetPosts component', () => {
    beforeEach(() => {
      // Mock the API call
      cy.intercept('GET', 'http://localhost:4000/posts', { fixture: 'posts.json' });
      cy.mount(<GetPosts />);
    });
  
    // it('renders correctly', () => {
    //   // Verify the rendered content
    //   cy.contains('h1', 'posts').should('be.visible');
    //   cy.get('li').should('have.length.greaterThan', 0);
    // });
  
    // it('displays post titles', () => {
    //   // Assuming your fixture has 3 posts
    //   cy.get('li').should('have.length', 3);
    //   cy.contains('title 1').should('be.visible');
    //   cy.contains('title 3').should('be.visible');
    //   cy.contains('title 4').should('be.visible');
    // });
  });