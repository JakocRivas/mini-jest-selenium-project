const { searchBar, searchedPerson, person } = require("./search/search"),
  {
    name,
    account,
    bio,
    location,
    personalSite,
    joinDate,
    navInformation,
    avatar
  } = require("./profile/profile"),
  {
    getElementBySelector,
    waitForElement,
    getWebElement,
    waitForSelector,
    waitElementClickable,
    waitFor
  } = require("../configuration/selenium"),
  {
    waitAndClickSelector,
    TypeOnSelector,
    waitListOfSelectors
  } = require("../helpers/helper");

class ProfilePage {
  constructor() {
    this.searchBar = searchBar;
    this.person = person;
    this.searchedPerson = searchedPerson;

    this.name = name;
    this.account = account;
    this.bio = bio;
    this.location = location;
    this.personalSite = personalSite;
    this.joinDate = joinDate;
    this.navInformation = navInformation;
    this.avatar = avatar;
  }

  async search() {
    await waitForSelector(this.searchBar);

    await waitAndClickSelector(this.searchBar);
    await TypeOnSelector(this.searchBar, person);
    await waitAndClickSelector(this.searchBar);

    await waitForSelector(this.searchedPerson);
    await waitElementClickable(this.searchedPerson);

    await waitAndClickSelector(this.searchedPerson);
  }

  async getData() {
    let data = {};
    // await waitForSelector(this.name);

    const accountData = async object => {
      // await waitForSelector(this.name);
      // await waitForSelector(this.account);
      // await waitForSelector(this.bio);
      // await waitForSelector(this.location);
      // await waitForSelector(this.personalSite);
      // await waitForSelector(this.joinDate);
      await waitListOfSelectors([this.name,this.account,this.bio,this.location,this.personalSite,this.joinDate])
      const personName = await getElementBySelector(this.name).then(text =>
        text.getText()
      );
      const personAccount = await getElementBySelector(this.account).then(
        text => text.getText()
      );
      const personBio = await getElementBySelector(this.bio).then(text =>
        text.getText()
      );
      const personLocation = await getElementBySelector(this.location).then(
        text => text.getText()
      );
      const personPersonalSite = await getElementBySelector(
        this.personalSite
      ).then(text => text.getText());
      const personJoinDate = await getElementBySelector(this.joinDate).then(
        text => text.getText()
      );
      object["name"] = personName;
      object["account"] = personAccount;
      object["bio"] = personBio;
      object["location"] = personLocation;
      object["site"] = personPersonalSite;
      object["join date"] = personJoinDate;
    };
    await accountData(data);

    console.log(data);
  }
}

module.exports = ProfilePage;
