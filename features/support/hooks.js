const {After, Before, Status} = require('@cucumber/cucumber');
const { POManager } = require('../../pageobjects/POManager');
const playwright = require('@playwright/test');

Before(async function () {
  const browser = await playwright.firefox.launch({
    headless: false
  });
  const context = await browser.newContext();
  this.page = await context.newPage();
  this.po = new POManager(this.page);
});
After(async function ({result}) {
  if(result.status === Status.FAILED){
    console.log('Test failed');
    await this.page.screenshot({path: 'testFailed.png'});
  }
  console.log('After hook');
});

// More info here https://github.com/cucumber/cucumber-js/blob/main/docs/support_files/hooks.md