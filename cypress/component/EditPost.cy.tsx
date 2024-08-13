import EditPost from "../../src/components/EditPost";

describe('<EditPost />', () => {
    const posts = [
        { id: '1', title: 'Test Title 1', body: 'Test Body 1' },
        { id: '2', title: 'Test Title 2', body: 'Test Body 2' },
        { id: '3', title: 'Test Title 3', body: 'Test Body 3' }
    
    ]; 
    // 1-----------------------
    it('renders the form with input fields', () => {
      cy.mount(<EditPost id="1" posts={posts} />);
      cy.get('form').should('exist');
      cy.get('#title').should('exist');
      cy.get('#body').should('exist');
      cy.get('.submit').should('exist');
    });

    //2-------------------------
    it('allows input in the title and body fields', () => {
        const posts = [{ id: '1', title: 'Test Title', body: 'Test Body' }]; // Mock posts data
        cy.mount(<EditPost id="1" posts={posts} />);
        cy.get('#title').clear().type('Updated Title').should('have.value', 'Updated Title');
        cy.get('#body').clear().type('Updated Body').should('have.value', 'Updated Body');
      });

      //3----------------------

    it('submits the form and resets input fields', () => {
        cy.intercept('PUT', 'http://localhost:4000/posts/1', {
          statusCode: 200,
          body: { id: '1', title: 'Updated Title', body: 'Updated Body' },
        }).as('putRequest');
      
        cy.mount(<EditPost id="1" posts={posts} />);
        cy.get('#title').type('Updated Title');
        cy.get('#body').type('Updated Body');
        cy.get('form').submit();
      
        cy.wait('@putRequest').its('response.statusCode').should('eq', 200);
        cy.get('#title').should('have.value', '');
        cy.get('#body').should('have.value', '');
      });




    it('handles network errors', () => {
        cy.intercept('PUT', 'http://localhost:4000/posts/1', {
          forceNetworkError: true,
        }).as('putRequest');
      
        cy.mount(<EditPost id="1" posts={posts} />);
        cy.get('#title').type('Updated Title');
        cy.get('#body').type('Updated Body');
        cy.get('form').submit();
      
        cy.wait('@putRequest');
        cy.on('window:alert', (str) => {
          expect(str).to.equal('Network error: Network Error');
        });
      });
    
  });