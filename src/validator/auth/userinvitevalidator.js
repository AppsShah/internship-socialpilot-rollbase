const { isEmailindb } = require("../../db/query");
const { verifytoken } = require("../../helper/token");

const inviteistokenexpire = (ctx, next) => {
  const verify = verifytoken(ctx.query.token);
  if (verify.email == null)
    return (ctx.body = {
      status: false,
      message: "token not verify maybe expire",
    });
  ctx.state.owner = verify.email;
  return next();
};
const inviteisemail = async (ctx, next) => {
  const email = ctx.request.body.email;
  if (email == undefined)
    return (ctx.body = { status: false, message: "Please Enter email" });
  const regexp = /\S+@\S+\.\S+/;
  if (!regexp.test(String(email).toLowerCase()))
    return (ctx.body = { status: false, message: "Please Enter right Email" });
  const data = await isEmailindb(email);
  if (data != null)
    return (ctx.body = { status: false, message: "User Already Present" });
  ctx.state.email = data;
  return next();
};
const inviteispassword = (ctx, next) => {
  const password = ctx.request.body.password;
//   console.log(password)
  if (password == undefined)
    return ctx.body = { status: false, message: "Please Enter password" };

  if (password.length < 8)
    return (ctx.body = {
      status: false,
      message: "Please Enter right password more then 8 char",
    });
  return next();
};
module.exports = { inviteistokenexpire, inviteisemail, inviteispassword };
