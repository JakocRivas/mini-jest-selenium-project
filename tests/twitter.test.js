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
  } = require("../resources/configuration/selenium"),
  { LoginPage } = require("../resources/PO/LoginPage");

describe("twitter", () => {
  beforeAll(async () => {
    loginPage = new LoginPage();
    goTo(ROOT_URL);
  });

  afterAll(() => {
    console.log("rawr");
    quit();
  });

  test("if there is a header on the page", async () => {
    const header = await loginPage.waitForHeader();
    expect(header).toBe("See what’s happening in the world right now");
  });

  it("should log in", async () => {
    await loginPage.login(EMAIL, PASSWORD);
  });
});
