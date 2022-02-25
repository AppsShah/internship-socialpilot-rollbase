const { isEmailindb } = require("../../db/auth");
// const { verifytoken } = require("../../helper/token")
const verifytoken = require("../../helper/token")

const resetpasswordverify=async(ctx,next)=>{
    console.log("/bmghjgr")
    const verify=verifytoken.verifytoken(ctx.query.token)
    console.log({verify})
    const {password}=ctx.request.body
    console.log('null vadi field',verify.email===null)
    if(!verify.email){console.log('null',verify.null)
        return ctx.body={success:false,message:"Token Expire"}}
    if(!password)
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