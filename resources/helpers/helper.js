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
async function waitAndClickSelector(selector) {
  await getElementBySelector(selector).then(element => element.click());
}

async function TypeOnSelector(selector, string) {
  await waitForSelector(selector);
  await getElementBySelector(selector).then(element =>
    element.sendKeys(string)
  );
}

module.exports = { waitAndClickSelector, TypeOnSelector };
