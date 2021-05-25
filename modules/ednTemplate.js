const { marketPlaceIdent } = require("../config/settings");

const ednTemplate = (ednRows) => {
  return new Promise((resolve) =>
    resolve(`{:ident :${marketPlaceIdent}
  :data [
      ${ednRows.join(" ")}
  ]}`)
  );
};

module.exports = ednTemplate;
