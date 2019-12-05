const { signUpTitle } = require("./login/header"),
  { homepageLogin, credentialsLogin } = require("./login/logInButton"),
  { emailField, passwordField, loginButton } = require("./login/loginForm"),
  { home } = require("./timeLine/header"),
  {
    getElementBySelector,
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
    this.timelineHome = home;
  }

  // Waits for the h1 of the page to be loaded and returns it text
  async waitForHeader(driver, selector) {
    await waitForSelector(driver, selector);
    const header = await getElementBySelector(driver, selector);
    return header.getText();
  }

  async login(driver, email, password) {
    await waitAndClickSelector(driver, this.homepageLogin);
    await TypeOnSelector(driver, this.emailField, email);

    await waitForSelector(driver, this.passwordField);
    await TypeOnSelector(driver, this.passwordField, password);

    await waitForSelector(driver, this.loginButton);
    await waitAndClickSelector(driver, this.loginButton);
  }
}

module.exports = LoginPage;
