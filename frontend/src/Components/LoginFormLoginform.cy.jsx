import React from "react";
import Loginform from "./LoginForm";
import { BrowserRouter, Routes, Route } from "react-router-dom";

describe("<Loginform />", () => {
  beforeEach(() => {
    cy.mount(
      <BrowserRouter>
        <Loginform />
      </BrowserRouter>
    );
  });

  it("intial load", () => {
    cy.get('#email').should('have.value', '')
    cy.get('#password').should('have.value', '')
  });

  it("intial load", () => {
    cy.get('#email').type("m@g.com")
    cy.get('#password').type("12345678")
    cy.get('.text-white').click()
  });
});
