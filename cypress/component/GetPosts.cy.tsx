import { mount } from 'cypress/react';
import GetPosts from '../../src/components/Post/GetPosts';
import { FormResType } from '../../src/CommonTypes';
import { useState } from 'react';

describe('GetPosts Component', () => {
  let initialMockPosts: FormResType[] = [
    { id: '1', title: 'First Post',body:'gfgggggggggggggggg' },
    { id: '2', title: 'Second Post',body:'gfgggggggggggggggg' },
    { id: '3', title: 'Third Post',body:'gfgggggggggggggggg' }
  ];

 // Variable to hold current posts, mutable across intercepts

 beforeEach(() => {
   // Initialize mockPosts before each test
  let mockPosts = [...initialMockPosts];

   // Intercept GET requests to fetch posts
   cy.intercept('GET', 'http://localhost:4000/posts', (req) => {
     req.reply({
       statusCode: 200,
       body: mockPosts,
     });
   }).as('getPosts');

   // Intercept DELETE requests to delete a post
   cy.intercept('DELETE', 'http://localhost:4000/posts/1', (req) => {
     const idToDelete = req.url.split('/').pop();
     // Update mockPosts by removing the deleted post
      mockPosts = mockPosts.filter(post => post.id !== idToDelete);
     req.reply({
       statusCode: 200,
       body: { message: 'Post deleted successfully' },
     });
   }).as('deletePost');

   // Create a wrapper component to manage state
   const Wrapper = () => {
     const [posts, setPosts] = useState<FormResType[]>([]);
     const [id, setId] = useState<string>('');

     return <GetPosts posts={posts} setPosts={setPosts} setId={setId} />;
   };

   // Mount the wrapper component
   mount(<Wrapper />);
 });

 it('should delete a post successfully and update the UI', () => {
   // Wait for the initial GET request to fetch posts
   cy.wait('@getPosts');

   // Verify that 3 posts are rendered
   cy.get('ul > li').should('have.length', 3);

   // Click the delete button of the first post
   cy.get('ul > li').first().contains('delete').click();

   // Wait for the DELETE request to complete
   cy.wait('@deletePost');

   // Verify that the success toast is displayed
   cy.contains('post removed successfully').should('be.visible');

   // Wait for the GET request triggered by the deleteHandler to refetch posts
   cy.wait('@getPosts');

   // Verify that the number of posts is now 2
   cy.get('ul > li').should('have.length', 2);
  });
});