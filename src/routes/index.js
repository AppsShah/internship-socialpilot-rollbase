const routerauth = require("./auth");

const routes = [routerauth];
module.exports = (app) => {
  routes.forEach((route) => {
    app.use(route.routes()).use(route.allowedMethods());
  });
};
