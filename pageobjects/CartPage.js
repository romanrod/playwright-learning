class CartPage {
  constructor(page) {
    this.page = page;
    this.item = this.page.locator('.infoWrap');
  }

  async buyNow(){
    await this.item.getByRole('button', { name: 'Buy Now' }).click();
  }

}

module.exports = { CartPage };