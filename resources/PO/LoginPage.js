const { signUpTitle } = require("./login/header"),
  { homepageLogin, credentialsLogin } = require("./login/logInButton"),
  { emailField, passwordField } = require("./login/loginForm"),
  {
    getElementBySelector,
    waitForElement,
    getWebElement,
    waitForSelector
  } = require("../configuration/selenium"),
  { waitAndClickSelector } = require("../helpers/helper");

class LoginPage {
  constructor() {
    this.header = signUpTitle;
    this.emailField = emailField;
    this.passwordField = passwordField;
    this.homepageLogin = homepageLogin;
    this.credentialsLogin = credentialsLogin;
  }

  // Waits for the h1 of the page to be loaded and returns it text
  async waitForHeader() {
    const header = await getElementBySelector(this.header);
    return header.getText();
  }

  async login(email, password) {
    // try {
    await waitAndClickSelector(this.homepageLogin);
    console.log(this.emailField);
    await waitForSelector(this.emailField);
    // } catch (err) {
    //   console.error(`something went wrong with the log in ${err}`);
    // }
  }
}
module.exports.LoginPage = LoginPage;
