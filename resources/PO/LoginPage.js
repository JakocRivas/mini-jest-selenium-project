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
  constructor(driver) {
    this.header = signUpTitle;
    this.emailField = emailField;
    this.passwordField = passwordField;
    this.homepageLogin = homepageLogin;
    this.credentialsLogin = credentialsLogin;
    this.loginButton = loginButton;
    this.timelineHome = home;
    this.driver = driver;
  }

  // Waits for the h1 of the page to be loaded and returns it text
  async waitForHeader(selector) {
    // driver = await driver;
    await this.driver.waitForSelector(selector);
    const header = await this.driver.getElementBySelector(selector);
    return header.getText();
  }

  async login(email, password) {
    // driver = await driver;

    await waitAndClickSelector(this.driver, this.homepageLogin);
    await TypeOnSelector(this.driver, this.emailField, email);

    await this.driver.waitForSelector(this.driver, this.passwordField);
    await TypeOnSelector(this.driver, this.passwordField, password);

    await this.driver.waitForSelector(this.driver, this.loginButton);
    await waitAndClickSelector(this.driver, this.loginButton);
  }
}

module.exports = LoginPage;
