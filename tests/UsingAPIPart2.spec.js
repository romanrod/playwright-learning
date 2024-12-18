const {test, expect} = require('@playwright/test');
let webContext;

test.beforeAll( async({browser}) =>{
  // Login before all tests once
  const context = await browser.newContext();
  const page = await context.newPage();
  await page.goto('https://rahulshettyacademy.com/client');
  await page.locator("#userEmail").fill("roman.g.rodriguez@gmail.com");
  await page.locator("#userPassword").fill("Imking@000");
  await page.locator("[value='Login']").click();
  await page.waitForLoadState('networkidle');
  await context.storageState({path: 'state.json'}); // Saves all browser cookies and session storage key:value pairs in a json file

  webContext = await browser.newContext({storageState:'state.json'}); // Opens a new context with all key:value pairs
});


test('Basic UI test', async () => {
  const page = await webContext.newPage(); // Creates the page with the context that contains all key:value pairs
  await page.goto('https://rahulshettyacademy.com/client');
  
  // All test actions goes here
});
