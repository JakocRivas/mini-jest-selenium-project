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
let waitUntilTime = 20000;

// Each instance of webdriver provides automated control over a browser session
const webdriver = require("selenium-webdriver"),
  chrome = require("selenium-webdriver/chrome"),
  firefox = require("selenium-webdriver/firefox");

// Configuration of chrome web driver
let caps = new Capabilities(),
  ChromeOptions = new chrome.Options();
// ChromeOptions.headless();
ChromeOptions.addArguments([
  "incognito",
  "--lang=en-GB",
  "headless",
  "--start-maximized"
]);

let driver = new Builder()
  .forBrowser(SELENIUM_BROWSER)
  .setChromeOptions(ChromeOptions)
  .build();

async function getElementByName(name) {
  return driver
    .findElement(By.name(name))
    .then(element => {
      waitFor(element);
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

async function getElementByTagName(tagName) {
  let tags = await driver.wait(
    until.elementsLocated(By.tagName(tagName), waitUntilTime)
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
  const el = await driver.wait(
    until.elementLocated(By.css(selector)),
    waitUntilTime
  );
  waitFor(el);
  return el;
}

async function getElementByXPath(xpath) {
  const el = await driver.wait(
    until.elementLocated(By.xpath(xpath)),
    waitUntilTime
  );
  waitFor(el);
  return el;
}

async function waitFor(el) {
  await driver.wait(until.elementIsVisible(el), waitUntilTime);
}

async function getTitle() {
  return await driver.getTitle().then(title => title);
}

module.exports = {
  getTitle,
  getElementByName,
  Builder,
  By,
  Key,
  until,
  driver,
  waitUntilTime,
  getElementByTagName,
  getElementByClassName
};
