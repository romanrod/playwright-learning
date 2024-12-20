class CheckoutPage {
  constructor(page){
    this.page = page;
    this.title = page.locator('h1');
    this.orders = page.locator("[routerlink*='dashboard/myorders']").first();
    this.country = page.getByPlaceholder('Select Country');

    this.cardNumber = page.locator('.input').nth(3);
    this.nameOnCard = page.locator('.input').nth(4);
    this.submit = page.locator('.btnn');

    this.orderIdStringElement = page.locator('.ng-star-inserted').nth(2)
  }

  async setCountry(country){
    await this.country.type(country, {delay: 100});
    const dropdown = await this.page.locator('.ta-results')
    dropdown.waitFor();
    await this.page.getByRole('button', { name: ` ${country}` }).click();
  }

  async enterCardData(cardNumber, nameOnCard){
    await this.cardNumber.fill(cardNumber);
    await this.nameOnCard.fill(nameOnCard);
    await this.submitCardData()
    await this.page.waitForLoadState();
  }

  async submitCardData(){
    await this.submit.click()
  }

  async orderId(){
    
    const string = await this.orderIdStringElement.textContent()
    await this.page.pause();
    return string.split(" ")[2];
  }

  async goToOrders(){
    await this.orders.click();
  }
}


module.exports = { CheckoutPage };