const { isEmailindb } = require("../../db/query");

const signupisemail = async (ctx, next) => {
  const email = ctx.request.body.email;
  if (email == undefined)
    return (ctx.body = { status: false, message: "Please Enter email" });
  const regexp = /\S+@\S+\.\S+/;
  if (!regexp.test(String(email).toLowerCase()))
    return (ctx.body = { status: false, message: "Please Enter right Email" });
  const data = await isEmailindb(email);
  if (data != null)
    return (ctx.body = { status: false, message: "user Already present" });
  return next();
};

const signuppassword = (ctx, next) => {
  const password = ctx.request.body.password;
  if (password == undefined)
    return (ctx.body = { status: false, message: "Please Enter password" });

  if (password.length < 8)
    return (ctx.body = {
      status: false,
      message: "Please Enter right password more then 8 char",
    });
  return next();
};

module.exports = { signupisemail, signuppassword };
