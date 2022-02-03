const {resetpassword}=require("../../db/query")
const { hashingpassword } = require("../../helper/hashing")

const resetpasswordcontroller=async(ctx)=>{
    const pass=ctx.request.body.password
    const newpass=hashingpassword(pass,10)
    const d=ctx.state.reset
    console.log(d._id)
    const data=await resetpassword(d._id,newpass)
    console.log(data)
    return ctx.body={success:true,message:"password change successfully"}
}
module.exports={resetpasswordcontroller}