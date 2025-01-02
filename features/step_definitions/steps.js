const { expect } = require('@playwright/test');
const { Given, When, Then } = require('@cucumber/cucumber');
const { POManager } = require('../../pageobjects/POManager');

Given('I am logged in as a customer with {string} and {string}', async function(email, password) {
  this.po = new POManager(this.page);
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


Given('I am logged in practise ecommerce with {string} and {string}', async function (email, password) {
  
  
  await this.page.goto('https://rahulshettyacademy.com/loginpagePractise/#/');
  await this.page.locator('#username').fill(email);
  await this.page.locator("[type='password']").fill(password);
  await this.page.locator('#signInBtn').click();  
});

Then('I should see the message {string}', async function (message) {
  await expect(this.page.locator("[style*='block']")).toHaveText(message);
});