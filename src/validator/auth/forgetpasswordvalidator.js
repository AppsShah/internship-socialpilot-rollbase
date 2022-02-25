const Email  = require("../../db/auth");

const forgetpasswordisemail=async(ctx,next)=>{
    const {email} = ctx.request.body;
    if (email == undefined)
      return (ctx.body = { status: false, message: "Please Enter email" });
    const regexp = /\S+@\S+\.\S+/;
    if (!regexp.test(String(email).toLowerCase()))
      return (ctx.body = { status: false, message: "Please Enter right Email" });
    const data = await Email.isEmailindb(email);
    if (data == null)
      return (ctx.body = { status: false, message: "NO user found" });
    ctx.state.email = data;
    return next();
}
module.exports={forgetpasswordisemail}