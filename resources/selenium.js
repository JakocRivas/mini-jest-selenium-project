"use strict";

require("selenium-webdriver/chrome");
require("selenium-webdriver/firefox");
require("chromedriver");
require("geckodriver");

// Builder creates new webdriver instance
// By describes mechanism to locate an element on the page
// key representation of pressable keys on the keyboard
const { Builder, By, Key, until } = require("selenium-webdriver");
//   rootURL = "https://www.mozilla.org/en-US/",
//   d = new Builder().forBrowser("firefox").build(),

// Sets time to wait for the test to finish
waitUntilTime = 20000;

// let driver, el, actual, expected;
// jasmine.DEFAULT_TIMEOUT_INTERVAL = 1000 * 60 * 5;

// Each instance of webdriver provides automated control over a browser session
const webdriver = require("selenium-webdriver"),
  chrome = require("selenium-webdriver/chrome"),
  firefox = require("selenium-webdriver/firefox");

let driver = new Builder()
  .forBrowser("chrome")
  .setChromeOptions("--incognito")
  .setFirefoxOptions(/* ... */)
  .build();

async function getElementById(id) {
  const el = await driver.wait(until.elementLocated(By.id(id)), waitUntilTime);
  return await driver.wait(until.elementIsVisible(el), waitUntilTime);
}
