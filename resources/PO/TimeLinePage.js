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
    waitFor
  } = require("../configuration/selenium"),
  { waitAndClickSelector, TypeOnSelector } = require("../helpers/helper");

class Timeline {
  constructor() {
    this.commentBox = commentBox;
    this.tweetButton = tweetButton;
    this.dropdown = dropdown;
    this.dropdownDelete = dropdownDelete;
    this.modalDelete = modalDelete;
    this.timelineComment = timelineComment;
    this.alertDeleted = alertDeleted;
  }

  async postMessage(driver) {
    await waitForSelector(driver, this.commentBox);
    let comment = crypto.randomBytes(20).toString("hex");

    await waitAndClickSelector(driver, this.commentBox);
    await TypeOnSelector(driver, this.commentBox, comment);
    const btn = await waitElementClickable(driver, this.tweetButton);
    await btn.click();

    await waitForSelector(driver, this.timelineComment);
    await waitElementClickable(driver, this.timelineComment);
    await waitForSelector(driver, timelineComment);

    await waitForSelector(driver, this.dropdown);
  }

  async deleteMessage(driver) {
    await waitAndClickSelector(driver, this.dropdown);
    await waitAndClickSelector(driver, this.dropdownDelete);

    await waitElementClickable(driver, this.modalDelete);
    await waitAndClickSelector(driver, this.modalDelete);

    await waitForSelector(driver, this.alertDeleted);
    await waitFor(driver, 5000);
  }
}
module.exports = Timeline;
