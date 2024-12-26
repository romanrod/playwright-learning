const {test, expect} = require('@playwright/test');
const { customTest } = require('../utils_ts/test-base');

test('User add product to cart', async ({page}) => {
  const email = "roman.g.rodriguez@gmail.com";
  const productName = 'ZARA COAT 3';

  await page.goto('https://rahulshettyacademy.com/client');
  await page.locator("#userEmail").fill(email);
  await page.locator("#userPassword").fill("Imking@000");
  await page.locator("[value='Login']").click();
  await page.waitForLoadState();
  
  const products = await page.locator('.card');
  products.first().waitFor();
  console.log('qty:' + await products.count());
  
  const count = await products.count();
  for(let i=0; i < count; i++){
    let currentProduct = products.nth(i);
    let productTitle = await currentProduct.locator("b").textContent();
    console.log(productTitle);
    if(productTitle === productName){
      await currentProduct.locator("text=Add to Cart").click();
      break;
    }
  }

  await page.locator('text="Product Added To Cart"').waitFor('visible');

  const goToCartButton = await page.locator("li:has-text('Cart')")
  
  const cartItemsCount = await goToCartButton.locator('label').textContent();

  expect(cartItemsCount).toBe('1');
  
  
  await goToCartButton.click();

  await page.locator('.cart').waitFor();

  const cartItem = await page.locator('li.items');
  const cartItemText = await cartItem.textContent();
  console.log(cartItemText);
  
  const productInCart = await cartItem.locator("h3").isVisible();

  expect(productInCart).toBeTruthy();

  // go to cart

  await page.getByRole('button', { name: 'Checkout❯' }).click();
  const shippingInfoBox = page.locator('div.payment__shipping')
  await shippingInfoBox.waitFor();
  expect(await shippingInfoBox.isVisible()).toBeTruthy();
  expect(page.getByText('roman.g.rodriguez@gmail.com')).toBeVisible();
  
  await page.getByPlaceholder('Select Country').pressSequentially('ind');
  
  const dropdown = await page.locator('.ta-results')
  dropdown.waitFor();

  await page.getByRole('button', { name: ' India' }).click();

  await page.locator('.input').nth(3).fill('123');

  await page.locator('.input').nth(4).fill('ROMAN RODRIGUEZ');

  await page.locator('.btnn').click();

  const title = page.locator('h1')
  title.waitFor();

  expect(await title.textContent()).toBe(' Thankyou for the order. ');

  const orderIdString = await page.locator('.ng-star-inserted').nth(2).textContent();

  const orderId = orderIdString.split(" ")[2];
  
  await page.getByText('Orders History Page').click();

  await page.locator('h1').waitFor();

  const firstOrderId = await page.getByRole('rowheader').first().textContent();

  console.log("firstOrderId");
  console.log(firstOrderId);
  console.log("orderId");
  console.log(orderId);

  expect(firstOrderId === orderId).toBeTruthy();

  await page.locator('tbody').locator('.ng-star-inserted').getByRole('button', {name: 'Delete'}).click();

});

customTest('User add product to cart usgin custom test function', async ({page, testDataForOrder}) => {
  
  await page.goto('https://rahulshettyacademy.com/client');
  await page.locator("#userEmail").fill(testDataForOrder.userEmail);
  await page.locator("#userPassword").fill(testDataForOrder.password);
  await page.locator("[value='Login']").click();
  await page.waitForLoadState();
  
  const products = await page.locator('.card');
  products.first().waitFor();
  console.log('qty:' + await products.count());
  
  const count = await products.count();
  for(let i=0; i < count; i++){
    let currentProduct = products.nth(i);
    let productTitle = await currentProduct.locator("b").textContent();
    console.log(productTitle);
    if(productTitle === testDataForOrder.productName){
      await currentProduct.locator("text=Add to Cart").click();
      break;
    }
  }

  await page.locator('text="Product Added To Cart"').waitFor('visible');

});
