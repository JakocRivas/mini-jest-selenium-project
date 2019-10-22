require("../resources/configuration/env");
const { email, password, ROOT_URL } = process.env,
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

describe("this is a describe", () => {
  beforeAll(async () => {
    goTo(ROOT_URL);
  });

  afterAll(async () => {
    quit();
    console.log("raw");
  });

  test("this is a test", async () => {
    let searchBar = await getElementByName("q");
    await searchBar.sendKeys("webdriver", Key.ENTER);

    const webElements = await getElementByTagName("li");

    let classesPromises = await Promise.all(
      webElements.map(className => className.getAttribute("className"))
    );

    console.log(classesPromises);

    expect(await getTitle()).toBe("webdriver - Google Search");
  });
});
