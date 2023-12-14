const { By, Key } = require("selenium-webdriver");
class LoginPage {
    constructor(driver) {
      this.driver = driver;
      this.usernameInput = By.id("user-name");
      this.passwordInput = By.id("password");
      this.loginButton = By.css("[value='LOGIN']");
    }
  
    async login(username, password) {
      await this.driver.findElement(this.usernameInput).sendKeys(username);
      await this.driver.findElement(this.passwordInput).sendKeys(password, Key.ENTER);
    }
  }

  module.exports = LoginPage