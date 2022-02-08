const { isEmailindb } = require("../../db/auth");
const { verifytoken } = require("../../helper/token")

const resetpasswordverify=async(ctx,next)=>{
    const verify=verifytoken(ctx.query.token)
    const {password}=ctx.request.body
    if(verify.email==null)
        return ctx.body={success:false,message:"Token Expire"}
    if(password==null)
        return ctx.body={success:false,message:"Enter Password"}
    if(password.length<8)
        return ctx.body={success:false,message:"Enter Password more then 8 char"}
    const d=await isEmailindb(verify.email.email)
    console.log(d ,verify.email.email)
    if(d==undefined)
        return ctx.body={success:false,message:"user Entered Wrong email"}
    ctx.state.reset=d
    return next()
}
module.exports={resetpasswordverify}