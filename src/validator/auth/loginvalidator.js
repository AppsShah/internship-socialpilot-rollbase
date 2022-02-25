// const { isEmailindb } = require("../../db/auth");
const authdata = require("../../db/auth");

const hashingpassword = require("../../helper/hashing");

const loginisemail = async (ctx, next) => {
  const { email } = ctx.request.body
  
  if (email == undefined)
    return (ctx.body = { status: false, message: "Please Enter email" });
  const regexp = /\S+@\S+\.\S+/;
  if (!regexp.test(email))
    return (ctx.body = { status: false, message: "Please Enter right Email" });
  // console.log()
  const data = await authdata.isEmailindb(email.toLowerCase());
  // console.log(data)
  if (data == null)
    return (ctx.body = { status: false, message: "NO user found" });
  ctx.state.email = data;
  return next();
};
const loginispassword = async (ctx, next) => {
  // console.log("in password - line 20")
  const {password} = ctx.request.body;
  if (password == undefined)
    return (ctx.body = { status: false, message: "Please Enter password" });
// console.log("in linr 24");
  if (password.length < 8)
    return (ctx.body = {
      status: false,
      message: "Please Enter right password more then 8 char",
    });
  const data=ctx.state.email
  const isPasswordValid = await  hashingpassword.hashingpasswordverify(password,data.password)
        if(!isPasswordValid)
          return (ctx.body = { status: false, message: "User Cannot Login" });
  return next();
};
module.exports={loginisemail,loginispassword}