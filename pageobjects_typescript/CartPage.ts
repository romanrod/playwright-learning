import { type Locator, type Page } from "@playwright/test";

export class CartPage {

  readonly page: Page;
  readonly item: Locator
  
  constructor(page: Page) {
    this.page = page;
    this.item = this.page.locator('.infoWrap');
  }

  async buyNow(){
    await this.item.getByRole('button', { name: 'Buy Now' }).click();
  }

}
