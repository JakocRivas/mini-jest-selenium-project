const {
  getElementBySelector,
  waitForElement,
  getWebElement
} = require("../configuration/selenium");

async function waitAndClickSelector(selector) {
  await getElementBySelector(selector).then(element => element.click());
}
module.exports = { waitAndClickSelector };
