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
caps.setPageLoadStrategy("eager");
ChromeOptions.addArguments([
  "--incognito",
  "--lang=en-GB",
  // "headless",
  "--start-maximized",
  "--ignore-certificate-errors-spki-list",
  "--ignore-ssl-errors",
  "--page-load-strategy-normal",
  "--standalone"
]);

let driver;
function newDriver() {
  driver = new Builder()
    .forBrowser(SELENIUM_BROWSER)
    .setChromeOptions(ChromeOptions)
    .build();
}
function quit() {
  driver.quit();
  driver.close();
}

function goTo(url) {
  newDriver();
  driver.get(url);
}

function loadPage() {
  driver.manage().setTimeout({ pageLoad: 15000 });
  // .set
  // .timeouts()
  // .implicitlywait(15, TimeUnit.seconds);
}

async function getElementByName(name) {
  return driver
    .findElement(By.name(name))
    .then(element => {
      waitForElement(element);
      return element;
    })
    .catch(console.error);
}

async function getElementById(id) {
  return driver
    .wait(until.elementLocated(By.id(id)), waitUntilTime)
    .then(element => {
      waitFor(element);
      return element;
    })
    .catch(console.error);
}

async function getListOfSelector(selector) {
  let tags = await driver.wait(
    until.elementsLocated(By.css(selector), waitUntilTime)
  );

  return tags;
}

async function getElementByClassName(className) {
  let classes = await driver.wait(
    until.elementsLocated(By.className(className), waitUntilTime)
  );
  return classes;
}

async function getElementBySelector(selector) {
  const webElement = await driver.findElement(By.css(selector));
  await waitForElement(webElement);
  return webElement;
}

async function getElementByXPath(selector) {
  const webElement = await driver.findElement(By.xpath(selector));
  await waitForElement(webElement);
  return webElement;
}

async function awaitIt(element) {
  await driver.wait(until.elementIsVisible(element), waitUntilTime);
}

/**
 * Waits for the web element of the selector to be visible and returns it
 *
 * @param {string} el
 * @returns {webElement} element
 */
async function waitForElement(selector) {
  const element = await driver.wait(
    until.elementIsVisible(selector),
    waitUntilTime
  );
  return element;
}

async function waitForVisibleElement(selector) {
  await waitForSelector(selector);
  const element = driver.wait(
    until.isElementPresent(driver.findElement(By.css(selector))),
    waitUntilTime
  );

  return element;
}

/**
 * waits only for the selector to be located on the page and does not returns it
 *
 * @param {selector} selector a css selector
 */
async function waitForSelector(selector) {
  await driver.wait(until.elementLocated(By.css(selector), waitUntilTime));
}

async function waitElementClickable(selector) {
  const element = await getElementBySelector(selector);
  let visible = await driver.wait(
    until.elementIsVisible(element),
    waitUntilTime
  );
  let enabled = await driver.wait(
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
async function getWebElement(selector) {
  const webElement = await driver.findElement(By.css(selector));
  await waitForElement(webElement);

  return webElement;
}

async function checkElement(selector) {
  while (document.querySelector(selector) === null) {
    await new Promise(resolve => window.requestAnimationFrame(resolve));
  }

  return document.querySelector(selector);
}

async function getElementByJs(selector) {
  const element = await driver.findElement(
    By.js(() => {
      driver.executeScript(`document.querySelector("${selector}")`);
    })
  );
  return element;
}

async function getTitle() {
  return await driver.getTitle().then(title => title);
}

function waitFor(a = waitUntilTime) {
  driver.sleep(a);
}
function refresh() {
  driver.navigate().refresh();
}
async function pressEnter(selector) {
  const element = await getElementBySelector(selector);
  await element.sendKeys(Key.RETURN);
}

// async function alertHandler(element) {
//   const wait = await new WebDriverWait(driver, new TimeSpan(0, 0, 30));
//   await wait.until(
//     SeleniumExtras.WaitHelpers.ExpectedConditions.elementToBeClickable(
//       By.css(lastElementToLoad)
//     )
//   );
// }

module.exports = {
  getTitle,
  getElementByName,
  Builder,
  By,
  Key,
  until,
  driver,
  waitUntilTime,
  getListOfSelector,
  getElementByClassName,
  getElementByXPath,
  quit,
  goTo,
  getElementBySelector,
  getElementByJs,
  waitForElement,
  getWebElement,
  waitForSelector,
  waitElementClickable,
  waitFor,
  loadPage,
  refresh,
  awaitIt,
  pressEnter,
  waitForVisibleElement
};
