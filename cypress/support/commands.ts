/// <reference types="cypress" />
// ***********************************************
// This example commands.ts shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })
//
declare global {
  namespace Cypress {
    interface Chainable {
      login(username: string, password: string): Chainable<void>;
      addProductToCart(productName: string): Chainable<void>;
      removeProductFromCart(productName: string, page: string): Chainable<void>;
      checkIfProductIsListedOnTheList(product: string): Chainable<void>;
    }
  }
}

import LoginPage from "./pageObjects/LoginPage";

Cypress.Commands.add("login", (username: string, password: string) => {
  LoginPage.enterUsername(username);
  LoginPage.enterPassword(password);
  LoginPage.submitLogin();
});

Cypress.Commands.add("addProductToCart", (productName: string) => {
  cy.get(`[data-test="add-to-cart-${productName}"]`).click();
  cy.get(`[data-test="remove-${productName}"]`).should("be.visible");
});

Cypress.Commands.add("removeProductFromCart",(productName: string, page: string) => {
    if (page === "inventory") {
      cy.get(`[data-test="remove-${productName}"]`).click();
      cy.get(`[data-test="add-to-cart-${productName}"]`).should("be.visible");
    } else if (page === "cart") {
      cy.get(`[data-test="remove-${productName}"]`).click();
      cy.get(`[data-test="remove-${productName}"]`).should('not.exist');
    }
});

Cypress.Commands.add("checkIfProductIsListedOnTheList", (product: string) => {
    cy.get(".inventory_item_name").should("be.visible").and("contain", product);
});