// cypress/component/App.cy.tsx

import React from 'react';
import { mount } from 'cypress/react';
import App from '../../src/App';  // Adjust the path as needed
import { FormResType } from '../../src/CommonTypes';

describe('App Component - Adding a Post', () => {
  const initialMockPosts: FormResType[] = [
    { id: '1', title: 'First Post', body: 'First body' },
    { id: '2', title: 'Second Post', body: 'Second body' },
  ];

  let mockPosts: FormResType[];

  beforeEach(() => {
    mockPosts = [...initialMockPosts];

    cy.intercept('GET', 'http://localhost:4000/posts', (req) => {
      req.reply({
        statusCode: 200,
        body: mockPosts,
      });
    }).as('getPosts');

    cy.intercept('POST', 'http://localhost:4000/posts', (req) => {
      const newPost: FormResType = {
        id: String(mockPosts.length + 1), // Mock ID generation
        title: req.body.title,
        body: req.body.body,
      };
      mockPosts.push(newPost);
      req.reply({
        statusCode: 200,
        body: newPost,
      });
    }).as('addPost');

    mount(<App />);
  });

  it('should add a post successfully and update the UI', () => {
    // Initial GET request
    cy.wait('@getPosts');

    // Verify the initial number of posts
    cy.get('ul > li').should('have.length', initialMockPosts.length);

    // Fill in the AddPost form
    cy.get('input[name="title"]').type('New Post');
    cy.get('input[name="body"]').type('This is a new post body');

    // Submit the form
    cy.get('form').submit();

    // Wait for the POST request to add the post
    cy.wait('@addPost');

    // Trigger the re-fetch after adding the post
    cy.wait('@getPosts');

    // Verify that the posts list has increased by one
    cy.get('ul > li').should('have.length', initialMockPosts.length + 1);

    // Verify that the new post is displayed correctly
    cy.get('ul > li').last().within(() => {
      cy.contains('New Post');
    });
  });
});
