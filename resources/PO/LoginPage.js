const { signUpTitle } = require("./login/header"),
  { homepageLogin, credentialsLogin } = require("./login/logInButton"),
  { emailField, passwordField, loginButton } = require("./login/loginForm"),
  {
    getElementBySelector,
    waitForElement,
    getWebElement,
    waitForSelector
  } = require("../configuration/selenium"),
  { waitAndClickSelector, TypeOnSelector } = require("../helpers/helper");

class LoginPage {
  constructor() {
    this.header = signUpTitle;
    this.emailField = emailField;
    this.passwordField = passwordField;
    this.homepageLogin = homepageLogin;
    this.credentialsLogin = credentialsLogin;
    this.loginButton = loginButton;
  }

  // Waits for the h1 of the page to be loaded and returns it text
  async waitForHeader() {
    const header = await getElementBySelector(this.header);
    return header.getText();
  }

  async login(email, password) {
    await waitAndClickSelector(this.homepageLogin);
    await TypeOnSelector(this.emailField, email);

    await waitForSelector(this.passwordField);
    await TypeOnSelector(this.passwordField, password);

    await waitForSelector(this.loginButton);
    await waitAndClickSelector(this.loginButton);
  }
}

module.exports = LoginPage;
