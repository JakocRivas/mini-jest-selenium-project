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

  async postMessage() {
    await waitForSelector(this.commentBox);
    let comment = crypto.randomBytes(20).toString("hex");

    await waitAndClickSelector(this.commentBox);
    await TypeOnSelector(this.commentBox, comment);
    const btn = await waitElementClickable(this.tweetButton);
    await btn.click();

    await waitForSelector(this.timelineComment);
    await waitElementClickable(this.timelineComment);
    await waitForSelector(timelineComment);

    await waitForSelector(this.dropdown);
  }

  async deleteMessage() {
    await waitAndClickSelector(this.dropdown);
    await waitAndClickSelector(this.dropdownDelete);

    await waitElementClickable(this.modalDelete);
    await waitAndClickSelector(this.modalDelete);

    await waitForSelector(this.alertDeleted);
    await waitFor(5000);
  }
}
module.exports = Timeline;
