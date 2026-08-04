export default {
  expo: {
    ...require("./app.json").expo,
    web: {
      ...require("./app.json").expo.web,
      baseUrl: "/Blazing-Spirits-Website"
    }
  }
};