require("../resources/configuration/env");
const { email, password, ROOT_URL } = process.env,
  {
    getElementByName,
    getTitle,
    Key,
    driver
  } = require("../resources/configuration/selenium");

describe("this is a describe", () => {
  beforeAll(async () => {
    driver.get(ROOT_URL);
  });

  afterAll(async () => {
    driver.quit();
    console.log("raw");
  });

  test("this is a test", async () => {
    let searchBar = await getElementByName("q");
    await searchBar.sendKeys("webdriver", Key.ENTER);
    expect(await getTitle()).toBe("webdriver - Google Search");
  });
});
