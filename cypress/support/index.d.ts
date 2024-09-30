/// <reference types="cypress" />

declare namespace Cypress {
  interface AUTWindow {
    React: typeof React;
    Providers: React.ComponentType;
  }
}
