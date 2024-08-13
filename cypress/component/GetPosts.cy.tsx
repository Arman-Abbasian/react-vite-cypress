import { FormResType } from '../../src/CommonTypes';
import GetPosts from '../../src/components/Post/GetPosts';

const posts:FormResType[]=
[
  {
  id: "9c64",
  title: "title 1",
  body: "body 1"
},
{
  id: "ada7",
  title: "title 3",
  body: "body 2"
},
{
  id: "0121",
  title: "title 4",
  body: "body 4"
}
];

describe('GetPosts component', () => {
  it('renders correctly', () => {
    cy.mount(<GetPosts posts={posts} setId={cy.stub()} setPosts={cy.stub()} />);
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
      cy.mount(<GetPosts posts={posts} setId={cy.stub()} setPosts={cy.stub()} />);
    });
  
    it('post title visible', () => {
      cy.contains('h1', 'posts').should('be.visible');
    });
    it('list items test',()=>{
      cy.get('li').should('have.length.greaterThan', 0);
      cy.get('li').should('have.length', 3);
    });
  
    it('displays post titles', () => {
      cy.contains('title 1').should('be.visible');
      cy.contains('title 3').should('be.visible');
      cy.contains('title 4').should('be.visible');
    });
  });