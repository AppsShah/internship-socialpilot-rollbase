const routerauth = require("./auth");
const routerblog=require("./blog")

const routes = [routerauth,routerblog];
module.exports = (app) => {
  routes.forEach((route) => {
    app.use(route.routes()).use(route.allowedMethods());
  });
};
