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
let waitUntilTime = 20000;

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
async function getElementByClassName(className) {
  const el = await driver.wait(
    until.elementLocated(By.className(className)),
    waitUntilTime
  );
  return await driver.wait(until.elementIsVisible(el), waitUntilTime);
}
let d, el;
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

it("waits for the driver to start", () => {
  return d.then(_d => {
    driver = _d;
  });
});
it("initialises the context", async () => {
  await driver
    .manage()
    .window()
    .setPosition(0, 0);
  await driver
    .manage()
    .window()
    .setSize(1280, 1024);
  await driver.get(rootURL);
});

it("should click on navbar button to display a drawer", async () => {
  el = await getElementById("nav-button-menu");
  el.click();
  el = await getElementByXPath(
    '//*[@id="moz-global-nav-drawer"]/div/div/ul/li[1]/h3/a'
  );

  actual = await el.getText();
  expected = "chrome";
  expect(actual).toEqual(expected);
});
