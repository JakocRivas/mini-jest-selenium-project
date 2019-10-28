require("../resources/configuration/env");
const { EMAIL, PASSWORD, ROOT_URL } = process.env,
  { signUpTitle } = require("../resources/PO/login/header"),
  { home } = require("../resources/PO/timeLine/header"),
  {
    getElementByName,
    getTitle,
    Key,
    driver,
    By,
    getElementByTagName,
    quit,
    goTo
  } = require("../resources/configuration/selenium");

("use strict");
let LoginPage = require("../resources/PO/LoginPage");

describe("twitter", () => {
  beforeAll(async () => {
    goTo(ROOT_URL);
    loginPageInstance = new LoginPage();
  });

  afterAll(() => {
    console.log("rawr");
    quit();
  });

  test("if there is a header on the page", async () => {
    const header = await loginPageInstance.waitForHeader(signUpTitle);
    await expect(header).toBe("See what’s happening in the world right now");
  });

  it("should log in", async () => {
    await loginPageInstance.login(EMAIL, PASSWORD);
  });

  it("should wait for the timeline to load", async () => {
    const header = await loginPageInstance.waitForHeader(home);
    expect(header).toBe("Home");
  });
});
