import React from 'react';
import { mount } from '@cypress/react';
import App from './App'; // Replace with the correct path to your component

it('renders the "cypress test" heading', () => {
  mount(<App />);
  cy.get('h1').contains('cypress test');
});