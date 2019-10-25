const {
  getElementBySelector,
  waitForElement,
  getWebElement
} = require("../configuration/selenium");

/**
 * Helper function that get rids of the need to create an instance for a webElement to click it after waiting it by it selector
 *
 * @param {string} selector
 */
async function waitAndClickSelector(selector) {
  await getElementBySelector(selector).then(element => element.click());
}
module.exports = { waitAndClickSelector };
