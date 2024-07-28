import React from 'react'
import AddPost from './AddPost'

describe('<AddPost />', () => {
  it('renders', () => {
    // see: https://on.cypress.io/mounting-react
    cy.mount(<AddPost />)
  })
})