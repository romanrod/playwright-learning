import { type Locator, type Page } from "@playwright/test";

export class CheckoutPage {
  readonly page: Page
  readonly title: Locator
  readonly orders:Locator
  readonly country: Locator
  readonly cardNumber: Locator
  readonly nameOnCard: Locator
  readonly submit: Locator
  readonly orderIdStringElement: Locator

  constructor(page: Page){
    this.page = page;
    this.title = page.locator('h1');
    this.orders = page.locator("[routerlink*='dashboard/myorders']").first();
    this.country = page.getByPlaceholder('Select Country');

    this.cardNumber = page.locator('.input').nth(3);
    this.nameOnCard = page.locator('.input').nth(4);
    this.submit = page.locator('.btnn');

    this.orderIdStringElement = page.locator('.ng-star-inserted').nth(2)
  }

  async setCountry(country: string){
    await this.country.type(country, {delay: 100});
    const dropdown = await this.page.locator('.ta-results')
    dropdown.waitFor();
    await this.page.getByRole('button', { name: ` ${country}` }).click();
  }

  async enterCardData(cardNumber: string, nameOnCard: string){
    await this.cardNumber.fill(cardNumber);
    await this.nameOnCard.fill(nameOnCard);
    await this.submitCardData()
    await this.page.waitForLoadState();
  }

  async submitCardData(){
    await this.submit.click()
  }

  async orderId(){
      
      const string = await this.orderIdStringElement.textContent();
      return string ? string.split(" ")[2] : "";
  }

  async goToOrders(){
    await this.orders.click();
  }
}
