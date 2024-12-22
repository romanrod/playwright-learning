import { test, expect, request } from '@playwright/test';
import { APIUtils } from '../utils/APIUtils';

// const loginPayload = {userEmail: email, userPassword: password}
let token;
let response
let productId = "6581ca979fd99c85e8ee7faf";

test.beforeAll( async () =>{
  // LOT OF CODE WAS EXTRACTED TO APIUtils (see previous commit)
  // performs request to get token
  const email = "roman.g.rodriguez@gmail.com";
  const password = "Imking@000";
  const apiContext = await request.newContext();
  const ApiUtils = new APIUtils(apiContext, email, password);
  response = await ApiUtils.createOrder("Argentina", productId);

});


/*

  Tests titles are just to express what's inside function

*/

test('@api Usgin API to get logged in faster and avoid UI for that', async({page}) =>{
  // sets token into session storage using result from beforeAll()  hook
  page.addInitScript(value => 
    {
      window.localStorage.setItem('token', value);
    }, 
    response.token
  );
  
  // Here performs test actions and assertions
  await page.goto('https://rahulshettyacademy.com/client');

});


test('@api Replace Add order UI operation with request to make test faster', async({page}) => {
  // For cases where place order action is already tested on another test and we need to place an order as precondition
  page.addInitScript(value => 
    {
      window.localStorage.setItem('token', value);
    }, 
    response.token
  );

  console.log(token);
  await page.goto('https://rahulshettyacademy.com/client');
  
  await page.locator("[routerlink*='dashboard/myorders']").click();

  await page.locator('h1').waitFor();

  await page.pause();

  const firstOrderId = await page.getByRole('rowheader').first().textContent();

  expect(firstOrderId === response.orderId).toBeTruthy();

});