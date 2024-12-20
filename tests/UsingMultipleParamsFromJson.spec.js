
import { test, expect } from '@playwright/test'
import { POManager } from '../pageobjects/POManager'

// Gets data from JSON files
const productsDataSet = JSON.parse(JSON.stringify(require('../test-data/placeOrdersDataSet.json')));
const checkoutDataSet = JSON.parse(JSON.stringify(require('../test-data/checkoutDataSet.json')));

let po;

test.beforeAll(async ({browser}) => {
  const context = await browser.newContext();
  const page = await context.newPage();
  po = new POManager(page);
});



for(const placeOrderDataSet of productsDataSet){
  test(`Add product ${placeOrderDataSet.productName} and checkout`, async ({page}) =>{
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
}