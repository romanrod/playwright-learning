import { test, expect, request } from '@playwright/test';

const email = "roman.g.rodriguez@gmail.com";
const password = "Imking@000";
const loginPayload = {userEmail: email, userPassword: password}
let token;
let orderId;
let productId = "6581ca979fd99c85e8ee7faf";

test.beforeAll( async () =>{
  // performs request to get token
  const apiContext = await request.newContext();
  
  // login action
  const loginResponse = await apiContext.post(
    'https://rahulshettyacademy.com/api/ecom/auth/login', 
    {
      data: loginPayload
    }
  );
 
  const loginResponseJson = await loginResponse.json();
  console.log('loginResponse:'+loginResponse);
  console.log('loginResponseJson:'+loginResponseJson);
  
  token = loginResponseJson.token;


  const orderPayload = {
    orders:[
      {
        country: "Argentina",
        productOrderedId: productId
      }
    ]
  }
  const orderResponse = await apiContext.post(
    'https://rahulshettyacademy.com/api/ecom/order/create-order', 
    {
      data: orderPayload,
      headers: {
        'Authorization' : token,
        'Content-Type' : 'application/json'
      }
    }
  );
  
  const orderResponseJson = await orderResponse.json();
  
  orderId = orderResponseJson.orders[0];

  console.log(orderId);

});

test.beforeEach( () =>{})


/*

  Tests titles are just to express what's inside function

*/

test('Usgin API to get logged in faster and avoid UI for that', async({page}) =>{
  // sets token into session storage using result from beforeAll()  hook
  page.addInitScript(value => 
    {
      window.localStorage.setItem('token', value);
    }, 
    token
  );
  
  // await page.goto('https://rahulshettyacademy.com/client');
  // await page.locator("#userEmail").fill(email);
  // await page.locator("#userPassword").fill("Imking@000");
  // await page.locator("[value='Login']").click();
  // await page.waitForLoadState();

  // Here performs test actions and assertions
  await page.goto('https://rahulshettyacademy.com/client');

});


test('Replace Add order UI operation with request to make test faster', async({page}) => {
  // For cases where place order action is already tested on another test and we need to place an order as precondition
  page.addInitScript(value => 
    {
      window.localStorage.setItem('token', value);
    }, 
    token
  );
  await page.goto('https://rahulshettyacademy.com/client');
  
  await page.locator("[routerlink*='dashboard/myorders']").click();

  await page.locator('h1').waitFor();

  await page.pause();

  const firstOrderId = await page.getByRole('rowheader').first().textContent();

  expect(firstOrderId === orderId).toBeTruthy();

});