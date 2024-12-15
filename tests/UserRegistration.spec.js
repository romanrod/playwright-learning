const {test, expect} = require('@playwright/test');

test('New user sign up', async ({browser}) => {

  const email = 'Anshika' + Math.floor(Math.random() * 1000) + '@domain.com';
  // const email2 = 'roman.g.rodriguez@gmail.com'

  const phone = Math.floor(Math.random() * 10000000000);
  const password = 'Imking@' + Math.floor(Math.random() * 1000);
  // const password2 = 'Imking@000';

  const context = await browser.newContext();
  const page = await context.newPage();
  await page.goto('https://rahulshettyacademy.com/client');
  await page.locator('[href*="register"]').click();

  // fill the form
  await page.locator('#firstName').fill('Anshika');
  await page.locator('#lastName').fill('Anshikavsky');
  await page.locator('#userEmail').fill(email);
  await page.getByPlaceholder('enter your number').fill(`${phone}`);

  
  const occupation = page.getByRole('combobox');
  await occupation.selectOption('Engineer');

  await page.getByLabel('Male', { exact: true }).click();
  
  await page.locator('#userPassword').fill(password);
  await page.locator('#confirmPassword').fill(password);
  await page.getByRole('checkbox', { text: 'I am 18 year or Older '}).check();
  await page.getByRole('button', { name: 'Register' }).click();

  await page.waitForLoadState();
  

  await expect(page.getByRole('heading', { name: 'Account Created Successfully' })).toBeVisible();
  await page.getByRole('button', { name: 'Login' }).click();

  await page.getByPlaceholder('email@example.com').fill('Anshika@domain.com');
  await page.getByPlaceholder('enter your passsword').fill('Imking@000');
  await page.getByRole('button', { name: 'Login' }).click();

  
});