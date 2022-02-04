const { isEmailindb } = require("../../db/query");

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

const isinviteteamorowner=(ctx,next)=>{
  const owneremail=ctx.state.userdata
  // console.log(owneremail)
  if(owneremail.level=="o")
      return next()
  return ctx.body={status:false,message:"only owner can create team"}
}
module.exports = {inviteisemail, inviteispassword ,isinviteteamorowner };
