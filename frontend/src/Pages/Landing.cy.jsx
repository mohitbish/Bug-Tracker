import React from 'react'
import Landing from './Landing'
import { BrowserRouter} from "react-router-dom";

describe('<Landing />', () => {
  beforeEach(() => {
    cy.mount(
      <BrowserRouter>
        <Landing />
      </BrowserRouter>
    );
  });
  it('renders', () => {
    cy.get('.text-2xl').should('have.text',"Login")
    cy.get(':nth-child(1) > .text-white').should('have.text',"Signup")
    cy.get(':nth-child(1) > .text-white').click()
    cy.get('.text-2xl').should('have.text',"Register")
    cy.get(':nth-child(1) > .text-white').should('have.text',"login")
  })
})