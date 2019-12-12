"use strict";
require("selenium-webdriver/chrome");
require("selenium-webdriver/firefox");
require("chromedriver");
require("geckodriver");
require("dotenv").config();
const { SELENIUM_BROWSER } = process.env;

// Builder creates new webdriver instance
// By describes mechanism to locate an element on the page
// key representation of pressable keys on the keyboard
const { Builder, By, Key, until, Capabilities } = require("selenium-webdriver");

// Sets time to wait for the test to finish
let waitUntilTime = 50000;

// Each instance of webdriver provides automated control over a browser session
const webdriver = require("selenium-webdriver"),
  chrome = require("selenium-webdriver/chrome"),
  firefox = require("selenium-webdriver/firefox");

// Configuration of chrome web driver
let caps = new Capabilities(),
  ChromeOptions = new chrome.Options();
// ChromeOptions.headless();
caps.setPageLoadStrategy("normal");

ChromeOptions.addArguments([
  "--incognito",
  "--lang=en-GB",
  // "headless",
  "--start-maximized",
  "--ignore-certificate-errors-spki-list",
  "--ignore-ssl-errors",
  "--page-load-strategy-normal",
  "--standalone",
  "--whitelisted-ips"
]);

class Driver {
  constructor() {
    this.driver = new Builder()
      .forBrowser(SELENIUM_BROWSER)
      .withCapabilities(caps)
      .setChromeOptions(ChromeOptions)
      .build();
  }

  async quit() {
    await this.driver.close();
    // await this.driver.quit();
    this.driver = null;
  }

  /**
   * Waits for the web element of the selector to be visible and returns it
   *
   * @param {string} el
   * @returns {webElement} element
   */
  async waitForElement(selector) {
    return await this.driver.wait(
      until.elementIsVisible(selector),
      waitUntilTime
    );
  }

  async getElementBySelector(selector) {
    const webElement = await this.driver.findElement(By.css(selector));
    await this.waitForElement(webElement);
    return webElement;
  }

  async goTo(url) {
    await this.driver.get(url);
  }

  loadPage(driver) {
    this.driver.manage().setTimeout({ pageLoad: 15000 });
    // .set
    // .timeouts()
    // .implicitlywait(15, TimeUnit.seconds);
  }

  async getElementByName(name) {
    return this.driver
      .findElement(By.name(name))
      .then(element => {
        waitForElement(element);
        return element;
      })
      .catch(console.error);
  }

  async getElementById(id) {
    return await this.driver
      .wait(until.elementLocated(By.id(id)), waitUntilTime)
      .then(element => {
        waitFor(element);
        return element;
      })
      .catch(console.error);
  }

  async getListOfSelector(selector) {
    let tags = await this.driver.wait(
      until.elementsLocated(By.css(selector), waitUntilTime)
    );

    return tags;
  }

  async getElementByClassName(className) {
    let classes = await this.driver.wait(
      until.elementsLocated(By.className(className), waitUntilTime)
    );
    return classes;
  }

  async getElementByXPath(selector) {
    const webElement = await this.driver.findElement(By.xpath(selector));
    await waitForElement(webElement);
    return webElement;
  }

  async awaitIt(element) {
    return await this.driver.wait(
      until.elementIsVisible(element),
      waitUntilTime
    );
  }

  async waitForVisibleElement(selector) {
    await this.waitForSelector(selector);
    const element = await this.driver.wait(
      until.isElementPresent(this.driver.findElement(By.css(selector))),
      waitUntilTime
    );

    return element;
  }

  /**
   * waits only for the selector to be located on the page and does not returns it
   *
   * @param {selector} selector a css selector
   */
  async waitForSelector(selector) {
    await this.driver.wait(
      until.elementLocated(By.css(selector), waitUntilTime)
    );
  }

  async waitElementClickable(selector) {
    const element = await this.getElementBySelector(selector);
    let visible = await this.driver.wait(
      until.elementIsVisible(element),
      waitUntilTime
    );
    let enabled = await this.driver.wait(
      until.elementIsEnabled(element),
      waitUntilTime
    );
    if (visible && enabled) {
      return element;
    }
  }

  /**
   * Finds the web element of the selector and returns it
   *
   * @param {string} selector
   * @returns {webElement}
   */
  async getWebElement(selector) {
    const webElement = await this.driver.findElement(By.css(selector));
    await this.waitForElement(webElement);

    return webElement;
  }

  async checkElement(selector) {
    while (document.querySelector(selector) === null) {
      await new Promise(resolve => window.requestAnimationFrame(resolve));
    }

    return document.querySelector(selector);
  }

  async getElementByJs(selector) {
    const element = await this.driver.findElement(
      By.js(() => {
        this.driver.executeScript(`document.querySelector("${selector}")`);
      })
    );
    return element;
  }

  async getTitle() {
    return await this.driver.getTitle().then(title => title);
  }

  async waitFor(a = waitUntilTime) {
    await this.driver.sleep(a);
  }
  async refresh() {
    await this.driver.navigate().refresh();
  }
  async pressEnter(selector) {
    const element = await this.getElementBySelector(selector);
    await element.sendKeys(Key.RETURN);
  }
}
// async function alertHandler(element) {
//   const wait = await new WebDriverWait(driver, new TimeSpan(0, 0, 30));
//   await wait.until(
//     SeleniumExtras.WaitHelpers.ExpectedConditions.elementToBeClickable(
//       By.css(lastElementToLoad)
//     )
//   );
// }

module.exports = Driver;
