const isEmailindb = require("../db/auth")
const verify = require("../helper/token")


const istokenverify=async(ctx,next)=>{
    const token=ctx.header.authorization
    // console.log(token +" token")
    if(!token)
        return ctx.body={success:false,message:"User is not authorized or token expire"}
    // console.log("here 2")
    const data=verify.verifytoken(token)
    // console.log("here")
    if(data.email==null)
        return ctx.body={success:false,message:"User is not authorized"}
    // console.log(data.email)
    // console.log((data.email).toLowerCase())
    const d=await isEmailindb.isEmailindb((data.email).toLowerCase())
    // console.log(d)
    if (d == null)
        return  ctx.body = {success:false,message:"user not found please create account first"}

    ctx.state.userdata=d
    // console.log("hello")
    return next()
}
module.exports={istokenverify}