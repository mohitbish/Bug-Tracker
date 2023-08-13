import React from 'react'
import Home from './Home'
import { BrowserRouter } from "react-router-dom";

describe('<Home />', () => {
  beforeEach(() => {
    cy.mount(
      <BrowserRouter>
        <Home />
      </BrowserRouter>
    );
  });
  it('renders', () => {
    cy.get('.w-full.flex-col').should('be.visible')
    cy.get('.grid.grid-cols-2').should('be.visible')
  })
})