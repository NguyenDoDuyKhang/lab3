export default (url) => {
  let paramString;

  if (url.includes("?")) {
    paramString = url.split("?")[1].split("&");
  } else {
    paramString = [];
  }
  const params = {};

  paramString.forEach(param => {
    const paramSplit = param.split('=');
    param[paramSplit[0]] = paramSplit[1]
  });

  return params;
};
