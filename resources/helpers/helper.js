const {
  getElementBySelector,
  waitForElement,
  getWebElement,
  waitForSelector
} = require("../configuration/selenium");

/**
 * Helper function that get rids of the need to create an instance for a webElement to click it after waiting it by it selector
 *
 * @param {string} selector
 */
async function waitAndClickSelector(driver, selector) {
  await driver.waitForSelector(selector);
  await driver.getElementBySelector(selector).then(element => element.click());
}

async function TypeOnSelector(driver, selector, word) {
  await driver.waitForSelector(selector);
  await driver
    .getElementBySelector(selector)
    .then(element => element.sendKeys(word));
}
async function waitListOfSelectors(driver, arr) {
  await Promise.all(
    arr.map(item => {
      return waitForSelector(driver, item);
    })
  );
}

module.exports = { waitAndClickSelector, TypeOnSelector, waitListOfSelectors };
