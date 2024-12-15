import { test, expect} from '@playwright/test';

test('Playwrigh special locators', async ({page}) => {
  await page.goto("https://rahulshettyacademy.com/angularpractice/");
  await page.getByLabel("Check me out if you Love IceCreams!").click();
  await page.getByLabel("Employed").check();

  await page.getByLabel("Gender").selectOption('Female');

  await page.getByRole('link',{name: 'Shop'}).click();

  await page.getByRole('heading', { name: 'Shop Name' }).isVisible();

  // To filter an element from multiple occurrences for locator
  
  await page.locator('app-card').filter({ hasText: 'Nokia Edge $24.99 Lorem ipsum' }).getByRole('button').click();
 
})