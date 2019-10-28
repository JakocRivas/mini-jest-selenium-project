require("../resources/configuration/env");
const { EMAIL, PASSWORD, ROOT_URL } = process.env,
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
    const header = await loginPageInstance.waitForHeader();
    await expect(header).toBe("See what’s happening in the world right now");
  });

  it("should log in", async () => {
    await loginPageInstance.login(EMAIL, PASSWORD);
  });
});
