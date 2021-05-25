const { v4: uuidv4 } = require("uuid");
var moment = require("moment");
const userId = require("./userId");
const { timeFormat, idLength } = require("../config/settings");

const ednRow = (model) => {
  let rows = [];
  model.map((item) => {
    const timestamp = moment().format(timeFormat + "-00:00");
    const user = `${item.USER}${userId(idLength)}`;

    rows = [
      ...rows,
      `[[:im.listing/id #uuid "${uuidv4()}" :listing/${item.MARKETPLACE}]
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
                  :role [:user.role/customer :user.role/provider]}]`,
    ];
  });
  return rows;
};

module.exports = ednRow;
