import { DashboardPage } from "./DashboardPage";
import { LoginPage } from "./LoginPage";
import { CheckoutPage } from "./CheckoutPage";
import { CartPage } from "./CartPage";

class POManager {
  constructor(page){
    this.page = page;
    this.loginPage = new LoginPage(this.page);
    this.dashboardPage = new DashboardPage(this.page);
    this.checkoutPage = new CheckoutPage(this.page);
    this.cartPage = new CartPage(this.page);
  }


  getLoginPage(){
    return this.loginPage;
  }

  getDashboardPage(){
    return this.dashboardPage;
  }

  getCheckoutPage(){
    return this.checkoutPage;
  }

  getCartPage(){
    return this.cartPage;
  }
}

module.exports = { POManager };