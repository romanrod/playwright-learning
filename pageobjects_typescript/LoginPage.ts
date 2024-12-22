import { type Locator, type Page } from "@playwright/test";

export class LoginPage {

  readonly page: Page
  readonly userEmail: Locator
  readonly userPassword: Locator
  readonly signInButton: Locator

  constructor(page: Page){
    this.page = page;
    this.userEmail = page.locator("#userEmail");
    this.userPassword = page.locator("#userPassword");
    this.signInButton = page.locator("[value='Login']");

  }

  async goto(){
    await this.page.goto('https://rahulshettyacademy.com/client');
    this.page.waitForLoadState();
  }

  async loginWith(email: string, password: string){
    await this.userEmail.fill(email);
    await this.userPassword.fill(password);
    await this.signInButton.click();
  }

  async successLogin(){
    await this.loginWith('roman.g.rodriguez@gmail.com','Imking@000');
  }

}
