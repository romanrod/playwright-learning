class CheckoutPage {
  constructor(page){
    this.page = page;
    this.title = page.locator('h1');
    this.orders = page.locator("[routerlink*='dashboard/myorders']");
    this.country = page.getByPlaceholder('Select Country');

    this.cardNumber = page.locator('.input').nth(3);
    this.nameOnCard = page.locator('.input').nth(4);
    this.submit = page.locator('.btnn');

    this.orderIdString = page.locator('.ng-star-inserted').nth(2)
  }

  async setCountry(country){
    await this.country.pressSequentially(country);
    const dropdown = await this.page.locator('.ta-results')
    dropdown.waitFor();
    await this.page.getByRole('button', { name: ` ${country}` }).click();
  }

  async enterCardData(cardNumber, nameOnCard){
    await this.cardNumber.fill(cardNumber);
    await this.nameOnCard.fill(nameOnCard);
    await this.submitCardData()
    await this.title.waitFor();
  }

  async submitCardData(){
    await this.submit.click()
  }

  async orderId(){
    await this.orderIdString.textContent().split(" ")[2];
  }

  async goToOrders(){
    await this.orders.click();
  }
}


module.exports = { CheckoutPage };