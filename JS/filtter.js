angular.module("batsfilters", []).filter("searchFilter", () => {
  return (data, searchType, searchText) => {
    if (!searchText) {
      return data;
    }

    let keyword = RegExp(searchText, "i");
    return data.filter((item) => {
      switch (searchType) {
        case "type":
          return keyword.test(item.type);
        case "created":
          return keyword.test(item.created);
        case "brand":
          return keyword.test(item.brand);
      }
    });
  };
});
