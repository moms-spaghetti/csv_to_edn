const { v4: uuidv4 } = require("uuid");
const timestamp = require("./timeStamp");
const userId = require("./userId");

const ednRow = (model) => {
  let rows = [];
  return new Promise((resolve) => {
    model.map((item) => {
      const newUser = userId(item.FIRSTNAME, item.LASTNAME, item.USEREMAIL);
      const newTimestamp = timestamp();

      rows = [
        ...rows,
        `[[:im.listing/id #uuid "${uuidv4()}" :listing/${item.MARKETPLACE}]
          #:im.listing{:createdAt #inst "${newTimestamp}"
                       :closed false
                       :title "${item.TITLE}"
                       :publicData {:marketplace "${item.MARKETPLACE}"
                                    :website "${item.WEBSITE}"
                                    :scoreavg ${item.SCOREAVG}}
                       :author #im/ref :user/${newUser.USERNAME}}]
         [[:im.user/id :user/${newUser.USERNAME}]
          #:im.user{:createdAt #inst "${newTimestamp}"
                    :primaryEmail {:im.email/address "${newUser.USEREMAIL}"
                                   :im.email/verified false}
                    :profile {:im.userProfile/firstName "${newUser.FIRSTNAME}"
                              :im.userProfile/lastName "${newUser.LASTNAME}"
                              :im.userProfile/displayName "${
                                newUser.FIRSTNAME
                              } ${newUser.LASTNAME}"}
                    :role [:user.role/customer :user.role/provider]}]
        `,
      ];
    });
    resolve(rows);
  });
};

module.exports = ednRow;
