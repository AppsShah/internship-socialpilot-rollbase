const { signup } = require("../../db/query")
const { hashingpassword } = require("../../helper/token")

const signupconttroller=async(ctx)=>{
    const email=ctx.request.body.email
    const password=ctx.request.body.password
    const hashpassword=hashingpassword(password)
    await signup(email,hashpassword)
    ctx.body={status:true,message:"Data Added Successfully"}
}
module.exports={signupconttroller}