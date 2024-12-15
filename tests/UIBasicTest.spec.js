const {test, expect} = require('@playwright/test');

test('Basic UI test', async ({browser}) => {
  const context = await browser.newContext();
  const page = await context.newPage();
  await page.goto('https://rahulshettyacademy.com/loginpagePractise/#/');
  await page.locator('#username').fill('rahulshettyacademy');
  // await page.locator("[type='password']").fill('learninga');
  // await page.locator('#signInBtn').click();
  // await expect(page.locator("[style*='block']")).toHaveText('Incorrect username/password.');
  // await expect(page).toHaveTitle('LoginPage Practise | Rahul Shetty Academy');
  await page.locator("[type='password']").fill('learning');
  await page.locator('#signInBtn').click();
  await expect(page).toHaveTitle('ProtoCommerce');
  const cardTitles = await page.locator(".card-body a");
  const first = cardTitles.first();
  await expect(first).toHaveText('iphone X');
  const allTitles = await cardTitles.allTextContents();
  console.log(allTitles);
});

test('Basis UI with default browser by using page global object', async ({page}) => {
  await page.goto('https://google.com');
  
  await expect(page).toHaveTitle('Google');
});