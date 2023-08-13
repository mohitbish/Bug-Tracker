import React from 'react'
import NavbarComponenet from './Navbar'
import { BrowserRouter } from "react-router-dom";

describe('<NavbarComponenet />', () => {
  beforeEach(() => {
    cy.mount(
      <BrowserRouter>
        <NavbarComponenet />
      </BrowserRouter>
    );
  });
  it('renders', () => {
    cy.get('.mx-4').should('be.visible')
    cy.get('.mx-4').should('have.text','Profile')
    cy.get('.px-10 > :nth-child(2)').should('be.visible')
    cy.get('.px-10 > :nth-child(2)').should('have.text','Logout')
    cy.get('.max-w-screen-xl > .items-center > .flex > :nth-child(1)').should('be.visible')
    cy.get('.max-w-screen-xl > .items-center > .flex > :nth-child(1)').should('have.text','Home')
    cy.get('.max-w-screen-xl > .items-center > .flex > :nth-child(2)').should('be.visible')
    cy.get('.max-w-screen-xl > .items-center > .flex > :nth-child(2)').should('have.text','Tickets')
    cy.get('.flex > :nth-child(3)').should('be.visible')
    cy.get('.flex > :nth-child(3)').should('have.text','Projects')
  })
})