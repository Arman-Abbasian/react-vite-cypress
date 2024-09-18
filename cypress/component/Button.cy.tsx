// cypress/component/Button.cy.js
import { mount } from 'cypress/react';
import Button from '../../src/components/Button/Index';

describe('Button Component', () => {
  it('should display the correct label', () => {
    const label = 'Click Me';
    mount(<Button label={label} />);
    cy.get('button').should('have.text', label);
  });

  it('should have the correct class', () => {
    mount(<Button label="Click Me" />);
    cy.get('button').should('have.class', 'btn');
  });
});
