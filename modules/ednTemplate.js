const ednTemplate = (ednRows, marketplaceident) => {
  return `{:ident :${marketplaceident}
      :data [
          ${ednRows.join(" ")}
      ]}`;
};

module.exports = ednTemplate;
