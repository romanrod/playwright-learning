/*
  locators

  If Id is present
  css -> tagname#id (or) #id


  If class attribute is present
  cass -> tagname.classname (or) .classname

  Write css based on any Attribute
  css -> tagname[attribute='value0']
  tagname is not required, it is useful if there's more than one element with same att

  Write css with traversing from Parent to child
  css -> parentTagName >> childTagName


  if needs to writhe the locator based on text
  text=''


  if need to use tagname and its text

  "tagname:has-text('text')"


*/


const {test, expect} = require('@playwright/test');

test('Basic UI test', async ({browser}) => {
  const context = await browser.newContext();
  const page = await context.newPage();
  await page.goto('https://rahulshettyacademy.com/loginpagePractise/#/');
  
  
});

test('run tests in debug mode', async ({browser}) => {
  // by running in terminal $ npx playwright test test/path/to/test.spec.js --debug
  const context = await browser.newContext();
  const page = await context.newPage();
  await page.goto('https://rahulshettyacademy.com/loginpagePractise/#/');
  await page.locator('#username').fill('rahulshettyacademy');
  await page.locator("[type='password']").fill('learning');
  await page.locator('#signInBtn').click();
  await page.waitForLoadState();
  await page.pause();
});

test('wait for an element to be visible', async ({page}) => {
  page.locator('#username').waitFor();
  await page.locator('text="Product Added To Cart"').waitForElementState('visible');
});

test.skip('run codegen in playwright', async ({browser}) => {
  //  to run code generator of playwright, in terminal enter $ npx playwright codegen <url>
  // then perform all interaction with the page and playwright will generate the code for you
});

test('Open in an new tab', async ({browser}) => {
  const context = await browser.newContext();
  const page = await context.newPage();
  await page.goto('https://rahulshettyacademy.com/loginpagePractise/');
  const documentLink = page.getByRole('link', { name: 'Free Access to InterviewQues/' });
  
  // THis is the way to open and wait new tab opened
  const [newPage] = await Promise.all(
    [
      context.waitForEvent('page'),
      documentLink.click(),
    ]
  );

  // then both objects are available
  const text = await newPage.locator('.red').textContent();
  const arrayText = text.split('@');
  const domain = arrayText[1].split(' ')[0];
  console.log(text);
  console.log();
  await page.locator('#username').fill(domain);
  await page.locator('#password').fill('learning');
  await page.locator('#signInBtn').click();
  await page.waitForLoadState();
  await page.pause();

});


test('work with tables', async ({page}) => {
  const rows = page.locator('tbody tr')
  for(i = 0; i < await rows.count(); i++){
    const row = rows.nth(i); // single row
    const firstcell = row.locator("th") // first cell
    const firstButton = row.locator('button').first() // or last()
    await firstButton.click();
  }
});

// const context = await browser.newContext();
//   const page = await context.newPage();
//   await page.goto('https://rahulshettyacademy.com/loginpagePractise/');
//   await page.click('#opentab');
//   const allTabs = await context.pages();
//   console.log(allTabs.length);
//   await allTabs[1].bringToFront();
//   await allTabs[1].waitForLoadState();
//   await allTabs[1].close();
//   await page.waitForLoadState();