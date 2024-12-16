import { test, expect } from '@playwright/test';


test('Usgin frames', async({page}) =>{
  await page.goto('https://rahulshettyacademy.com/AutomationPractice');
  await page.waitForLoadState();
  const framePage = page.frameLocator('#courses-iframe');
  
  await framePage.locator('li a[href*="lifetime-access"]:visible').click();
  await page.waitForLoadState();
  const suscribers = await framePage.locator('.text h2 span').textContent();
  expect(suscribers).toBe('13,522');

});