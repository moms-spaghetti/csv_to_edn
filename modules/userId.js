const { characters, idLength } = require("../config/settings");
const formatName = require("../helpers/formatName");

const userId = (firstName, lastName, userEmail) => {
  var result = [];
  var charactersLength = characters.length;
  for (var i = 0; i < idLength; i++) {
    result.push(
      characters.charAt(Math.floor(Math.random() * charactersLength))
    );
  }
  return {
    FIRSTNAME: formatName(firstName),
    LASTNAME: formatName(lastName),
    USEREMAIL: userEmail.toLowerCase(),
    USERNAME: `${firstName.toLowerCase()}${result.join("")}`,
  };
};

module.exports = userId;
