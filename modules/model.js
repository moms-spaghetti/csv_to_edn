function model(data) {
  let model = [];
  return new Promise((resolve) => {
    data.map((item) => {
      model = [
        ...model,
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

    resolve(model);
  });
}

module.exports = model;
