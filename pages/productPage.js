const { By } = require("selenium-webdriver");

class ProductsPage {
    constructor(driver) {
      this.driver = driver;
      this.titleElement = By.className("title");
      this.productLink = By.id("item_4_title_link");
      this.addToCartButton = By.className("btn_inventory");
      this.shoppingCartLink = By.className("shopping_cart_link");
      this.checkoutButton = By.className("checkout_button");
    }
  
    async getTitle() {
      return await this.driver.findElement(this.titleElement).getText();
    }
  
    async clickProductLink() {
      await this.driver.findElement(this.productLink).click();
    }
  
    async clickAddToCart() {
      await this.driver.findElement(this.addToCartButton).click();
    }
  
    async clickShoppingCart() {
      await this.driver.findElement(this.shoppingCartLink).click();
    }
  
    async clickCheckout() {
      await this.driver.findElement(this.checkoutButton).click();
    }
  }
  

  module.exports = ProductsPage