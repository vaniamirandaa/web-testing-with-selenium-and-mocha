const { describe, it, beforeEach, afterEach } = require("mocha");
const { Builder, By, Key, Select, until } = require("selenium-webdriver");
const { Options } = require("selenium-webdriver/chrome");
const assert = require("assert");
const LoginPage = require("../pages/login");
const ProductsPage = require("../pages/productPage");
const CheckoutPage = require("../pages/checkoutPage");
const LogoutPage = require("../pages/logout");

describe("web testing", function () {
  this.timeout(15000);
  let driver, loginPage
  let url = "https://saucedemo.com";

  beforeEach(async () => {
    let options = new Options();
    options.excludeSwitches("enable-logging");

    driver = await new Builder()
      .forBrowser("chrome")
      .setChromeOptions(options)
      .build();

    await driver.get(url);

    loginPage = new LoginPage(driver);


  });

  afterEach(async () => {
    // await new Promise((resolve) => setTimeout(resolve, 1500));
    await driver.quit();
  });

  it("should success login with valid credentials", async () => {

    await loginPage.login("standard_user", "secret_sauce");
  });

  it("should fail login with invalid credentials", async () => {

    await loginPage.login("standard_userr", "secret_sauce");

    const msg = await driver.findElement(By.css("h3")).getText();
    assert.strictEqual(
      msg,
      "Epic sadface: Username and password do not match any user in this service"
    );
  });

  it("should sort products by various criteria", async () => {

    await loginPage.login("standard_user", "secret_sauce");

    await driver.get(url + "/inventory.html");

    const values = [
      { "A to Z": "az" },
      { "Z to A": "za" },
      { "Low to High": "lohi" },
      { "High to Low": "hilo" },
    ];

    for (const i of values) {
      const displayText = Object.keys(i)[0];
      const sortingValue = i[displayText];

      const dropDown = await driver.findElement(
        By.className("product_sort_container")
      );
      const sort = new Select(dropDown);
      await sort.selectByValue(sortingValue);
    }
  });

  it("add product to cart and checkout", async () => {
    const productsPage = new ProductsPage(driver);
    const checkoutPage = new CheckoutPage(driver);

    await loginPage.login("standard_user", "secret_sauce");

    await productsPage.clickProductLink();
    await productsPage.clickAddToCart();

    await productsPage.clickShoppingCart();
    await productsPage.clickCheckout();

    await checkoutPage.enterShippingInfo("abc", "cde", "21312");
    await checkoutPage.clickFinish();
  });

  it("logout from website", async () => {
    const logoutPage = new LogoutPage(driver);

    await loginPage.login("standard_user", "secret_sauce");

    await logoutPage.openMenu();
    await logoutPage.clickLogout();
  });
});
