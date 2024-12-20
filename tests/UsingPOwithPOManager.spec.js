
import { test, expect } from '@playwright/test'
import { POManager } from '../pageobjects/POManager'

let po;

test.beforeAll(async ({browser}) => {
  const context = await browser.newContext();
  const page = await context.newPage();
  po = new POManager(page);
});

// This file contains the same tests on UseingPageObject.spec.js but using POManager instead
test('Using page object pattern for login only', async ({page}) => {
  const email = "roman.g.rodriguez@gmail.com";
  const password = "Imking@000";
  
  const loginPage = po.getLoginPage();
  await loginPage.goto();
  loginPage.loginWith(email, password);
});

test('Add product to cart using page object pattern', async ({page}) => {
  
  const productName = 'ZARA COAT 3';
  
  const loginPage = po.getLoginPage();
  await loginPage.goto();  
  await loginPage.successLogin();

  const dashboardPage = po.getDashboardPage();
  await dashboardPage.addToCart(productName);
  await dashboardPage.navigateToCart();
});


test('Add product and checkout', async ({page}) =>{
  const productName = 'ZARA COAT 3';
  const loginPage = po.getLoginPage();
  await loginPage.goto();  
  await loginPage.successLogin();

  const dashboardPage = po.getDashboardPage();
  await dashboardPage.addToCart(productName);
  await dashboardPage.navigateToCart();

  const cartPage = po.getCartPage();
  await cartPage.buyNow();

  const checkoutPage = po.getCheckoutPage();
  await checkoutPage.setCountry('India');
  await checkoutPage.enterCardData('1234432167899876','ROMAN RODRIGUEZ');
  
  expect(await checkoutPage.title.textContent()).toBe(' Thankyou for the order. ');

  const orderId = checkoutPage.orderId();

  checkoutPage.goToOrders();
  

});