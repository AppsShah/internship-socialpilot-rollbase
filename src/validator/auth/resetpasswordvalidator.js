const authdata = require("../../db/auth");
// const { verifytoken } = require("../../helper/token")
const verifytoken = require("../../helper/token")

const resetpasswordverify=async(ctx,next)=>{
    const verify=verifytoken.verifytoken(ctx.query.token)
    const {password}=ctx.request.body
    if(!verify.email)
        return ctx.body={success:false,message:"Token Expire"}
    if(!password)
        return ctx.body={success:false,message:"Enter Password"}
    if(password.length<8)
        return ctx.body={success:false,message:"Enter Password more then 8 char"}
    const d=await authdata.isEmailindb(verify.email.email)
    if(!d)
        return ctx.body={success:false,message:"user Entered Wrong email"}
    ctx.state.reset=d
    return next()
}
module.exports={resetpasswordverify}