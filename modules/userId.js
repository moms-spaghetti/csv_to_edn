const { characters } = require("../config/settings");

const userId = (length) => {
  var result = [];
  var charactersLength = characters.length;
  for (var i = 0; i < length; i++) {
    result.push(
      characters.charAt(Math.floor(Math.random() * charactersLength))
    );
  }
  return result.join("");
};

module.exports = userId;
