const {test, expect} = require('@playwright/test');

test('Basic UI test', async ({page}) => {
  await page.goto('https://rahulshettyacademy.com/client/auth/login');
  await page.locator("#userEmail").fill("anshika@gmail.com");
  await page.locator("#userPassword").fill("Imking@000");
  await page.locator("[value='Login']").click();
  await page.waitForLoadState()
  
});

test('Basis UI with default browser by using page global object', async ({page}) => {
  await page.goto('https://google.com');
  
  await expect(page).toHaveTitle('Google');
});

test.only('UI controls', async ({page}) => {
  await page.goto('https://rahulshettyacademy.com/loginpagePractise/#/');
  const userName = page.locator('#username');
  const signIn = page.locator('#signInBtn');
  const dropdown = page.locator('select.form-control');
  dropdown.selectOption("consult");
  await page.pause();
});

