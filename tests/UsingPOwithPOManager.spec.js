
import { test, expect } from '@playwright/test'
import { POManager } from '../pageobjects/POManager'

// Gets data from JSON files
const loginDataSet = JSON.parse(JSON.stringify(require('../test-data/userLoginDataSet.json')));
const placeOrderDataSet = JSON.parse(JSON.stringify(require('../test-data/placeOrderDataSet.json')));
const checkoutDataSet = JSON.parse(JSON.stringify(require('../test-data/checkoutDataSet.json')));

let po;

test.beforeAll(async ({browser}) => {
  const context = await browser.newContext();
  const page = await context.newPage();
  po = new POManager(page);
});

test.describe.configure({mode: 'parallel'});

test('Using page object pattern for login only', async ({page}) => {  
  const loginPage = po.getLoginPage();
  await loginPage.goto();
  loginPage.loginWith(loginDataSet.email, loginDataSet.password);
});

test('Add product to cart using page object pattern', async ({page}) => {
  
  const loginPage = po.getLoginPage();
  await loginPage.goto();  
  await loginPage.successLogin();

  const dashboardPage = po.getDashboardPage();
  await dashboardPage.addToCart(placeOrderDataSet.productName);
  await dashboardPage.navigateToCart();
});


test('Add product and checkout', async ({page}) =>{
  const loginPage = po.getLoginPage();
  await loginPage.goto();  
  await loginPage.successLogin();

  const dashboardPage = po.getDashboardPage();
  await dashboardPage.addToCart(placeOrderDataSet.productName);
  await dashboardPage.navigateToCart();

  const cartPage = po.getCartPage();
  await cartPage.buyNow();

  const checkoutPage = po.getCheckoutPage();
  await checkoutPage.setCountry(checkoutDataSet.country);
  await checkoutPage.enterCardData(checkoutDataSet.cardNumber,checkoutDataSet.nameOnCard);
  
  expect(await checkoutPage.title.textContent()).toBe(' Thankyou for the order. ');

  const orderId = checkoutPage.orderId();

  checkoutPage.goToOrders();
  

});