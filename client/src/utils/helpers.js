const buildQueryString = (queryParams = {}) => {
  let path = "";
  Object.keys(queryParams).forEach((key, index) => {
    if (!index) {
      path += `${key}=${queryParams[key]}`;
    } else {
      path += `&${key}=${queryParams[key]}`;
    }
  });
  return path;
};

export { buildQueryString };
