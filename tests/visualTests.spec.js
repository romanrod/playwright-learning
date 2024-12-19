import {test, expect } from '@playwright/test';


test('Screenshots of page and element', async ({page}) => {
  
  await page.goto('http://rahulshettyacademy.com/AutomationPractice');
  
  await expect(page.locator("#displayed-text")).toBeVisible();
  // Takes screenshot of an element only
  await page.locator("#displayed-text").screenshot({path: 'screenshots/components/screenshot.png'})
  
  await page.locator('#hide-textbox').click();

  // Takes screenshot of the entire page
  await page.screenshot({path: 'screenshots/pages/screenshot.png'});
  await expect(page.locator("#displayed-text")).toBeHidden();
});


test('Screenshot and visual comparison', async ({page}) => {
  await page.goto('http://flightaware.com');
  expect(await page.screenshot()).toMatchSnapshot('landing.png');
});