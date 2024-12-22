import { type Locator, type Page } from "@playwright/test";

export class DashboardPage {

  readonly page: Page;
  readonly products: Locator;
  readonly productsText: Locator;
  readonly cart: Locator;

  constructor(page: Page){
    this.page = page;
    this.products = page.locator('.card-body');
    this.productsText = page.locator('.card-body b');
    this.cart = page.locator("[routerlink*='cart']");
  }

  async addToCart(productName: string){
    const titles = await this.productsText.allTextContents();
    console.log(titles);
    const count = await this.products.count();
    for(let i = 0; i < count; i ++){
      console.log(await this.products.nth(i).locator('b').textContent());
      if(await this.products.nth(i).locator('b').textContent() === productName){
        await this.products.nth(i).locator("text= Add To Cart").click();
        break;
      }
    }
  }

  async navigateToCart(){
    await this.cart.click();
    await this.page.waitForLoadState('networkidle');
  }

}
