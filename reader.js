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
        TITLE: item.TITLE,
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
    const RFC_3339 = "YYYY-MM-DDTHH:mm:ss";
    const timestamp = moment().format(RFC_3339 + "-00:00");
    const user = `${item.USER}${makeId(10)}`;

    ednDataStrings = [
      ...ednDataStrings,
      `
    [[:im.listing/id #uuid "${uuidv4()}" :listing/${item.MARKETPLACE}]
    #:im.listing{:createdAt #inst "${timestamp}"
                 :closed false
                 :title "${item.TITLE}"
                 :publicData {:marketplace "${item.MARKETPLACE}"
                              :website "${item.WEBSITE}"
                              :scoreavg ${item.SCOREAVG}}
                 :author #im/ref :user/${user}}]

   [[:im.user/id :user/${user}]
    #:im.user{:createdAt #inst "${timestamp}"
              :primaryEmail {:im.email/address "${item.USEREMAIL}"
                             :im.email/verified false}
              :profile {:im.userProfile/firstName "${item.FIRSTNAME}"
                        :im.userProfile/lastName "${item.LASTNAME}"
                        :im.userProfile/displayName "${item.FIRSTNAME} ${
        item.LASTNAME
      }"}
              :role [:user.role/customer :user.role/provider]}]
      `,
    ];
  });

  const marketplaceident = "bikesoil";

  const ednTemplate = `{:ident :${marketplaceident}
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
