const { By } = require("selenium-webdriver");

class CheckoutPage {
    constructor(driver) {
      this.driver = driver;
      this.firstNameInput = By.id("first-name");
      this.lastNameInput = By.id("last-name");
      this.zipCodeInput = By.id("postal-code");
      this.continueButton = By.id("continue");
      this.finishButton = By.id("finish");
    }
  
    async enterShippingInfo(firstName, lastName, zipCode) {
      await this.driver.findElement(this.firstNameInput).sendKeys(firstName);
      await this.driver.findElement(this.lastNameInput).sendKeys(lastName);
      await this.driver.findElement(this.zipCodeInput).sendKeys(zipCode);
      await this.driver.findElement(this.continueButton).click();
    }
  
    async clickFinish() {
      await this.driver.findElement(this.finishButton).click();
    }
  }
 
  module.exports = CheckoutPage