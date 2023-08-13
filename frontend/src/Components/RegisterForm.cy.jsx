import React from "react";
import RegisterForm from "./RegisterForm";
import { BrowserRouter, Routes, Route } from "react-router-dom";

describe("<RegisterForm />", () => {
  beforeEach(() => {
    cy.mount(
      <BrowserRouter>
        <RegisterForm />
      </BrowserRouter>
    );
  });
  it("renders", () => {
    cy.get("#username").should("have.value", "");
    cy.get('#email').should("have.value", "");
    cy.get('#title').should("have.value", "");
    cy.get('#password').should("have.value", "");
    cy.get('#password2').should("have.value", "");
  });
});
