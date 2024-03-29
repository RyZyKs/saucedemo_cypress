import InventoryPage from "../support/pageObjects/InventoryPage";
import CartPage from "../support/pageObjects/CartPage";
import burgerMenu from "../support/pageObjects/burgerMenu";
import CheckoutStepOnePage from "../support/pageObjects/CheckoutStepOnePage";
import CheckoutStepTwoPage from "../support/pageObjects/CheckoutStepTwoPage";
import CheckoutCompletePage from "../support/pageObjects/CheckoutCompletePage";

describe("Checkout Complete Suite", () => {
  beforeEach(() => {
    cy.visit("/");
    cy.fixture("users.json").then((users) => {
      const stdUser = users.stdUser;
      cy.login(stdUser.username, stdUser.password);
      InventoryPage.checkIfPageIsOpened();
    });
  });

  it("Complete the checkout", () => {
    cy.fixture("products.json").then((products) => {
      const backpack = products.backpack;
      const bikeLight = products.bikeLight;
  
      cy.addProductToCart(InventoryPage.BACKPACK);
      cy.addProductToCart(InventoryPage.BIKE_LIGHT);
      InventoryPage.moveToCart();
      cy.checkIfProductIsListedOnTheList(backpack.name);
      cy.checkIfProductIsListedOnTheList(bikeLight.name);
      CartPage.moveToCheckoutStepOnePage();
      CheckoutStepOnePage.fillUpyourInformation('Przemek', 'Gierada', '30-606');
      CheckoutStepOnePage.moveToCheckoutStepTwoPage();
      cy.checkIfProductIsListedOnTheList(backpack.name);
      cy.checkIfProductIsListedOnTheList(bikeLight.name);
      CheckoutStepTwoPage.moveToCheckoutCompletePage();
      CheckoutCompletePage.viewCheckoutCompleteConfirmation();
    });
  });

  after(() => {
    burgerMenu.logout();
  });
});