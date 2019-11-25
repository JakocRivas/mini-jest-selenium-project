const {person} = require('../search/search')
module.exports = {
  name:
    "#page-container .AppContainer .ProfileHeaderCard .ProfileHeaderCard-name a",
  account:
    "#page-container .AppContainer .ProfileSidebar .ProfileHeaderCard-screenname span",
  bio: `div[data-testid="UserDescription"]`,
  location: `div[data-testid="UserProfileHeader_Items"] span`,
  personalSite: `div[data-testid="UserProfileHeader_Items"] a`,
  joinDate: `div[data-testid="UserProfileHeader_Items"] span:nth-child(3)`,
  navInformation: `#page-outer  .AppContainer .ProfileCanopy-nav div[role="navigation"].ProfileNav span.ProfileNav-value`,
  avatar: "img.ProfileAvatar-image"
  avatar: `div[data-testid="primaryColumn"] a[href="/${person}/photo"] img`
};
