import { test, expect, request } from '@playwright/test'

let webContext;

test.beforeAll(async ({browser}) => {
  const context = await browser.newContext();
  const page = await context.newPage();
  await page.goto('https://rahulshettyacademy.com/client');
  await page.locator("#userEmail").fill("roman.g.rodriguez@gmail.com");
  await page.locator("#userPassword").fill("Imking@000");
  await page.locator("[value='Login']").click();
  await page.waitForLoadState('networkidle');
  await context.storageState({path: 'state.json'});

  webContext = await browser.newContext({storageState:'state.json'});

});



test('Security test request intercept', async () => {
  const page = await webContext.newPage();
  await page.goto('https://rahulshettyacademy.com/client');
  await page.locator("[routerlink*='dashboard/myorders']").click();  
  // See that url is using wildcard * to match with all request for any id
  await page.route("https://rahulshettyacademy.com/api/ecom/order/get-orders-details?id=*",
    route => route.continue({url: "https://rahulshettyacademy.com/api/ecom/order/get-orders-details?id=674dc956eb3c71ba7921b37f"})
  )


  await page.pause();
  await page.getByRole("button",{ name:'View'}).first().click();
  
  const message = await page.locator('.blink_me').textContent();

  expect(message).toBe('You are not authorize to view this order');

});
