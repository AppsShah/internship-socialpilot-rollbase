const { isEmailindb } = require("../db/auth")
const { verifytoken } = require("../helper/token")


const istokenverify=async(ctx,next)=>{
    const token=ctx.header.authorization
    if(token==undefined)
        return ctx.body={success:false,message:"User is not authorized or token expire"}
    const data=verifytoken(token)
    if(data.email==null)
        return ctx.body={success:false,message:"User is not authorized"}
    // console.log(data.email)
    console.log((data.email).toLowerCase())
    const d=await isEmailindb((data.email).toLowerCase())
    console.log(d)
    if (d == null)
        return  ctx.body = {success:false,message:"user not found please create account first"}

    ctx.state.userdata=d
    return next()
}
module.exports={istokenverify}