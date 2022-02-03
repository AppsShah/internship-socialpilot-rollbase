const { isEmailindb } = require("../../db/query");
const { hashingpasswordverify } = require("../../helper/hashing");

const loginisemail = async (ctx, next) => {
  const email = ctx.request.body.email;
  if (email == undefined)
    return (ctx.body = { status: false, message: "Please Enter email" });
  const regexp = /\S+@\S+\.\S+/;
  if (!regexp.test(String(email).toLowerCase()))
    return (ctx.body = { status: false, message: "Please Enter right Email" });
  const data = await isEmailindb(email);
  if (data == null)
    return (ctx.body = { status: false, message: "NO user found" });
  ctx.state.email = data;
  return next();
};
const loginispassword = async (ctx, next) => {
  const password = ctx.request.body.password;
  if (password == undefined)
    return (ctx.body = { status: false, message: "Please Enter password" });

  if (password.length < 8)
    return (ctx.body = {
      status: false,
      message: "Please Enter right password more then 8 char",
    });
  const data=ctx.state.email
        if(!await hashingpasswordverify(password,data.password))
          return (ctx.body = { status: false, message: "User Cannot Login" });
  return next();
};
module.exports={loginisemail,loginispassword}