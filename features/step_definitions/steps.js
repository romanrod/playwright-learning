const { expect } = require('@playwright/test');
const { Given, When, Then } = require('@cucumber/cucumber');

Given('I am logged in as a customer with {string} and {string}', async function(email, password) {
  
  const loginPage = this.po.getLoginPage();
  await loginPage.goto();
  loginPage.loginWith(email, password);
});

When('I add {string} product to the cart', async function (productName) {
  const dashboardPage = this.po.getDashboardPage();
  await dashboardPage.addToCart(productName);
  
});

Then('the product should be in the carts', async function () {
  await dashboardPage.navigateToCart();
  const cartPage = this.po.getCartPage();
  await cartPage.buyNow();

  const checkoutPage = this.po.getCheckoutPage();
  await checkoutPage.setCountry("India");
  await checkoutPage.enterCardData("4111111111111111","ROMAN RODRIGUEZ");
  
  expect(await checkoutPage.title.textContent()).toBe(' Thankyou for the order. ');
}); 