import { test, expect } from '@playwright/test';


test('Validations', async({page}) => {
  await page.goto('http://rahulshettyacademy.com/AutomationPractice');
  
  await expect(page.locator("#displayed-text")).toBeVisible();
  await page.locator('#hide-textbox').click();
  await expect(page.locator("#displayed-text")).toBeHidden();


  
  //listen for events, no matter when this line is located on the test, it will run when event occurrs
  page.on('dialog',  dialog => dialog.accept());
  // page.on('dialog',  dialog => dialog.dismiss());

  await page.locator('#confirmbtn').click();

  await page.locator('#mousehover').hover();




});
