class LoginPage {

  constructor(page){
    this.page = page;
    this.userEmail = page.locator("#userEmail");
    this.userPassword = page.locator("#userPassword");
    this.signInButton = page.locator("[value='Login']");

  }

  async goto(){
    await this.page.goto('https://rahulshettyacademy.com/client');
    this.page.waitForLoadState();
  }

  async loginWith(email, password){
    await this.userEmail.fill(email);
    await this.userPassword.fill(password);
    await this.signInButton.click();
    await this.page.waitForLoadState('networkidle');
  }

  async successLogin(){
    await this.loginWith('roman.g.rodriguez@gmail.com','Imking@000');
  }

}

module.exports= {LoginPage};
