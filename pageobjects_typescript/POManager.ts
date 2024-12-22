import { type Page } from "@playwright/test";

import { DashboardPage } from "../pageobjects_typescript/DashboardPage";
import { LoginPage } from "../pageobjects_typescript/LoginPage";
import { CheckoutPage } from "../pageobjects_typescript/CheckoutPage";
import { CartPage } from "../pageobjects_typescript/CartPage";

export class POManager {
  readonly page: Page
  readonly loginPage: LoginPage
  readonly dashboardPage: DashboardPage
  readonly checkoutPage: CheckoutPage
  readonly cartPage: CartPage

  constructor(page: Page){
    this.page = page;
    this.loginPage = new LoginPage(this.page);
    this.dashboardPage = new DashboardPage(this.page);
    this.checkoutPage = new CheckoutPage(this.page);
    this.cartPage = new CartPage(this.page);
  }


  getLoginPage(): LoginPage{
    return this.loginPage;
  }

  getDashboardPage(): DashboardPage {
    return this.dashboardPage;
  }

  getCheckoutPage(): CheckoutPage{
    return this.checkoutPage;
  }

  getCartPage(): CartPage{
    return this.cartPage;
  }
}
