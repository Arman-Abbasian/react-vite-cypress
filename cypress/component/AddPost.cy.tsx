import AddPost from "../../src/components/Post/AddPost";

describe('<AddPost />', () => {
  it('mounts', () => {
    cy.mount(<AddPost />)
  });
  it('renders input fields', () => {
    cy.mount(<AddPost />);
    cy.get('#title').should('exist');
    cy.get('#body').should('exist');
  });
});