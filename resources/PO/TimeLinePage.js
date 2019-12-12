var crypto = require("crypto");

const { commentBox, tweetButton } = require("./timeLine/commentBox"),
  {
    dropdown,
    dropdownDelete,
    modalDelete,
    timelineComment,
    alertDeleted
  } = require("./timeLine/comment"),
  { waitAndClickSelector, TypeOnSelector } = require("../helpers/helper");
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
    await this.driver.waitForSelector(this.commentBox);
    let comment = crypto.randomBytes(20).toString("hex");

    await waitAndClickSelector(this.driver, this.commentBox);
    await TypeOnSelector(this.driver, this.commentBox, comment);
    const btn = await this.driver.waitElementClickable(this.tweetButton);
    await btn.click();

    await this.driver.waitForSelector(this.timelineComment);
    await this.driver.waitElementClickable(this.timelineComment);
    await this.driver.waitForSelector(timelineComment);

    await this.driver.waitForSelector(this.dropdown);
  }

  async deleteMessage() {
    await this.driver.waitForSelector(this.dropdown);
    await waitAndClickSelector(this.driver, this.dropdown);
    await this.driver.waitForSelector(this.dropdownDelete);
    await waitAndClickSelector(this.driver, this.dropdownDelete);

    await this.driver.waitElementClickable(this.modalDelete);
    await waitAndClickSelector(this.driver, this.modalDelete);

    await this.driver.waitForSelector(this.alertDeleted);
    await this.driver.waitFor(5000);
  }
}
module.exports = Timeline;
