const { By } = require("selenium-webdriver");

class LogoutPage {
    constructor(driver) {
      this.driver = driver;
      this.menuButton = By.id('react-burger-menu-btn');
      this.menu = By.className('bm-menu-wrap');
      this.logoutButton = By.id('logout_sidebar_link');
    }
  
    async openMenu() {
      await this.driver.findElement(this.menuButton).click();
      await this.driver.sleep(1000);
    }
  
    async clickLogout() {
      const menu = await this.driver.findElement(this.menu);
      await menu.findElement(this.logoutButton).click();
    }
  }

  module.exports = LogoutPage