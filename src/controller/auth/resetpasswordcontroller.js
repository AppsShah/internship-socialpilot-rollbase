const reset=require("../../db/auth")
const { hashingpassword } = require("../../helper/hashing")

const resetpasswordcontroller=async(ctx)=>{
    // console.log("inside reset verify controller")
    const {password}=ctx.request.body
    const newpass=hashingpassword(password,10)
    const d=ctx.state.reset
    // console.log(d._id)
    const data=await reset.resetpassword(d._id,newpass)
    // console.log(data)
    return ctx.body={success:true,message:"password change successfully"}
}
module.exports={resetpasswordcontroller}