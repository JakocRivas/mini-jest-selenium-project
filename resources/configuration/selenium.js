"use strict";

require("selenium-webdriver/chrome");
require("selenium-webdriver/firefox");
require("chromedriver");
require("geckodriver");

// Builder creates new webdriver instance
// By describes mechanism to locate an element on the page
// key representation of pressable keys on the keyboard
const { Builder, By, Key, until, Capabilities } = require("selenium-webdriver");
//   rootURL = "https://www.mozilla.org/en-US/",
//   d = new Builder().forBrowser("firefox").build(),

// Sets time to wait for the test to finish
let waitUntilTime = 20000;

// let driver, el, actual, expected;
// jasmine.DEFAULT_TIMEOUT_INTERVAL = 1000 * 60 * 5;

// Each instance of webdriver provides automated control over a browser session
const webdriver = require("selenium-webdriver"),
  chrome = require("selenium-webdriver/chrome"),
  firefox = require("selenium-webdriver/firefox");
let caps = new Capabilities(),
  ChromeOptions = new chrome.Options();
// ChromeOptions.headless();
ChromeOptions.addArguments(["incognito", "--lang=en-GB", "headless"]);
// let navigation = new Navigation();

// caps.set(ChromeOptions);

let driver = new Builder()
  .forBrowser("chrome")
  .setChromeOptions(ChromeOptions)
  .build();

async function getElementById(id) {
  return driver
    .wait(until.elementLocated(By.name(id)), waitUntilTime)
    .then(e => {
      console.log(e, id);
      return e;
    })
    .catch(console.error);
}
async function getElementByClassName(className) {
  const el = await driver.wait(
    until.elementLocated(By.className(className)),
    waitUntilTime
  );
  return await driver.wait(until.elementIsVisible(el), waitUntilTime);
}

async function getElementBySelector(selector) {
  const el = await driver.wait(
    until.elementLocated(By.css(selector)),
    waitUntilTime
  );
  return await driver.wait(until.elementIsVisible(el), waitUntilTime);
}
async function getElementByXPath(xpath) {
  const el = await driver.wait(
    until.elementLocated(By.xpath(xpath)),
    waitUntilTime
  );
  return await driver.wait(until.elementIsVisible(el), waitUntilTime);
}

async function getTitle() {
  return await driver.getTitle().then(title => title);
}

// console.log(driver);
module.exports = {
  getTitle,
  getElementById,
  Builder,
  By,
  Key,
  until,
  driver,
  waitUntilTime
};
