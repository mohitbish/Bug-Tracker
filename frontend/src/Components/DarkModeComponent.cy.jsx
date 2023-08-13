import React from 'react'
import DarkModeComponent from './DarkModeComponent'

describe('<DarkModeComponent />', () => {
  it('renders', () => {
    // see: https://on.cypress.io/mounting-react
    cy.mount(<DarkModeComponent />)
    cy.get('button').should('be.visible')
    cy.get('button').click()
    cy.get('button').should('be.visible')
  })
})