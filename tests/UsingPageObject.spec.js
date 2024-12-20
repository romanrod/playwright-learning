import { test, expect } from '@playwright/test'
import { LoginPage } from '../pageobjects/LoginPage'
import { DashboardPage } from '../pageobjects/DashboardPage'
import { CheckoutPage } from '../pageobjects/CheckoutPage';


test('Using page object pattern for login only', async ({page}) => {
  const email = "roman.g.rodriguez@gmail.com";
  const password = "Imking@000";
  
  const loginPage = new LoginPage(page);
  await loginPage.goto();
  loginPage.loginWith(email, password);
});

test('Add product to cart using page object pattern', async ({page}) => {
  
  const productName = 'ZARA COAT 3';
  
  const loginPage = new LoginPage(page);
  await loginPage.goto();  
  await loginPage.successLogin();

  const dashboardPage = new DashboardPage(page);
  await dashboardPage.addToCart(productName);
  await page.navigateToCart();
});


test('Add product and checkout', async ({page}) =>{
  const productName = 'ZARA COAT 3';
  const loginPage = new LoginPage(page);
  await loginPage.goto();  
  await loginPage.successLogin();

  const dashboardPage = new DashboardPage(page);
  await dashboardPage.addToCart(productName);
  await dashboardPage.navigateToCart();
  const checkoutPage = new CheckoutPage(page);
  await checkoutPage.setCountry('India');
  await checkoutPage.enterCardData('1234432167899876','ROMAN RODRIGUEZ');
  
  expect(await checkoutPage.title.textContent()).toBe(' Thankyou for the order. ');

  const orderId = checkoutPage.orderId();

  checkoutPage.goToOrders();
  

});