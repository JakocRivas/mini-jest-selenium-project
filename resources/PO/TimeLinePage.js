var crypto = require("crypto");

const { commentBox, tweetButton } = require("./timeLine/commentBox"),
  {
    dropdown,
    dropdownDelete,
    modalDelete,
    timelineComment,
    alertDeleted
  } = require("./timeLine/comment"),
  {
    waitForSelector,
    waitElementClickable,
    waitFor,
    newDriver
  } = require("../configuration/selenium"),
  { waitAndClickSelector, TypeOnSelector } = require("../helpers/helper");
let driver = newDriver();
class Timeline {
  constructor(driver) {
    this.commentBox = commentBox;
    this.tweetButton = tweetButton;
    this.dropdown = dropdown;
    this.dropdownDelete = dropdownDelete;
    this.modalDelete = modalDelete;
    this.timelineComment = timelineComment;
    this.alertDeleted = alertDeleted;
    this.driver = driver;
  }

  async postMessage() {
    await waitForSelector(this.driver, this.commentBox);
    let comment = crypto.randomBytes(20).toString("hex");

    await waitAndClickSelector(this.driver, this.commentBox);
    await TypeOnSelector(this.driver, this.commentBox, comment);
    const btn = await waitElementClickable(this.driver, this.tweetButton);
    await btn.click();

    await waitForSelector(this.driver, this.timelineComment);
    await waitElementClickable(this.driver, this.timelineComment);
    await waitForSelector(this.driver, timelineComment);

    await waitForSelector(this.driver, this.dropdown);
  }

  async deleteMessage() {
    await waitAndClickSelector(this.driver, this.dropdown);
    await waitAndClickSelector(this.driver, this.dropdownDelete);

    await waitElementClickable(this.driver, this.modalDelete);
    await waitAndClickSelector(this.driver, this.modalDelete);

    await waitForSelector(this.driver, this.alertDeleted);
    await waitFor(this.driver, 5000);
  }
}
module.exports = Timeline;
