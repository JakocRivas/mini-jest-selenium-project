const { email, password } = require("../resources/configuration/env"),
  {
    getElementById,
    getTitle,
    Key,
    driver
  } = require("../resources/configuration/selenium");

// const Builder = require("../resources/selenium").Builder;
// const By = require("../resources/selenium").By;
// const Key = require("../resources/selenium").Key;
// const until = require("../resources/selenium").until;
// const driver = require("../resources/selenium").driver;
// const waitUntilTime = require("../resources/selenium").waitUntilTime;

// async function example() {
//   let driver = await new Builder()
//     .forBrowser("chrome")
//     .setChromeOptions("--incognito")
//     .setFirefoxOptions(/* ... */)
//     .build();
//   try {
//     await driver.get("http://www.google.com/ncr");
//     await driver.findElement(By.name("q")).sendKeys("webdriver", Key.RETURN);
//     await driver.wait(until.titleIs("webdriver - Google Search"), 1000);
//   } finally {
//     await driver.quit();
//   }
// }

describe("this is a describe", () => {
  beforeAll(async () => {
    driver.get("http://www.google.com/");
  });

  afterAll(async () => {
    driver.quit();
    console.log("raw");
  });

  test("this is a test", async () => {
    let searchBar = await getElementById("q");
    await searchBar.sendKeys("webdriver", Key.ENTER);
    expect(await getTitle()).toBe("webdriver - Google Search");
  });
});
