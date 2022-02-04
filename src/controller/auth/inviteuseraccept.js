const { inviteuseradd } = require("../../db/query")
const { hashingpassword } = require("../../helper/hashing")
const { verifytoken } = require("../../helper/token")

const invitetokenacceptcontroller=async(ctx)=>{
    // console.log(ctx.query.token)
        const email=ctx.request.body.email
        const verifydata=verifytoken(ctx.query.token)
        console.log(verifydata)
    const password=ctx.request.body.password
    const hashpass=hashingpassword(password)
    const d=await inviteuseradd(verifydata.owneremail,email,hashpass)
    ctx.body={status:true,message:"User added Successfully"}
}
module.exports={invitetokenacceptcontroller}