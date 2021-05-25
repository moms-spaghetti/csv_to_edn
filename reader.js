const csv = require("csv-parser");
const fs = require("fs");
const { v4: uuidv4 } = require("uuid");
var moment = require("moment");

let data = [];

fs.createReadStream("marketplace.csv")
  .pipe(csv({ separator: ";" }))
  .on("data", (row) => {
    data = [...data, row];
  })
  .on("end", () => outputFile(data));

function outputFile(contents) {
  let ednRows = [];
  let ednDataStrings = [];

  contents.map((item) => {
    ednRows = [
      ...ednRows,
      {
        MARKETPLACE: item.MARKETPLACE,
        WEBSITE: item.WEBSITE,
        SCOREAVG: item.SCOREAVG,
        USER: item.USER,
        USEREMAIL: item.USEREMAIL,
        FIRSTNAME: item.FIRSTNAME,
        LASTNAME: item.LASTNAME,
      },
    ];
  });

  ednRows.map((item) => {
    const timestamp = moment().toISOString(true);
    const user = `${item.USER}${makeId(10)}`;
    const userEmailVerified = false;

    ednDataStrings = [
      ...ednDataStrings,
      `
    [[:im.listing/id #uuid "${uuidv4()}" :listing/${item.MARKETPLACE}]
    #:im.listing{:createdAt #inst "${timestamp}"
                 :marketplace "${item.MARKETPLACE}"
                 :website "${item.WEBSITE}"
                 :scoreavg ${item.SCOREAVG}

   [[:im.user/id :user/${user}]
    #:im.user{:createdAt #inst "${uuidv4()}"
              :primaryEmail {:im.email/address "${item.USEREMAIL}"
                             :im.email/verified ${userEmailVerified}}
              :profile {:im.userProfile/firstName "${item.FIRSTNAME}"
                        :im.userProfile/lastName "${item.LASTNAME}"
                        :im.userProfile/displayName "${item.FIRSTNAME} ${
        item.LASTNAME
      }"
              :role [:user.role/provider]}]
      `,
    ];
  });

  const ednTemplate = `{:ident :marketplaceident
    :data [
        ${ednDataStrings.join(" ")}
    ]}`;

  fs.writeFile("output.edn", ednTemplate, function (err) {
    if (err) return console.log(err);
    console.log("file write successful");
  });
}

function makeId(length) {
  var result = [];
  var characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  var charactersLength = characters.length;
  for (var i = 0; i < length; i++) {
    result.push(
      characters.charAt(Math.floor(Math.random() * charactersLength))
    );
  }
  return result.join("");
}
