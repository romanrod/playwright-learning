import { test, expect } from '@playwright/test';


test('Using calendar elements', async({page}) => {

  const monthNumber = '6';
  const date = '15';
  const year = '2027';

  await page.goto('https://rahulshettyacademy.com/seleniumPractise/#/offers');

  await page.locator('.react-date-picker__inputGroup').click();
  
  const calendar = page.locator('.react-date-picker__inputGroup');

  await page.locator('.react-calendar__navigation__label').click()
  await page.locator('.react-calendar__navigation__label').click()

  await page.getByText(year).click();

  await page.locator('.react-calendar__year-view__months__month').nth(Number(monthNumber)-1).click();
  
  await page.locator('.react-calendar').getByRole('button', { name: '15' }).click();

});