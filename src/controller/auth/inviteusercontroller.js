const { inviteuseradd } = require("../../db/query")
const { hashingpassword } = require("../../helper/hashing")

const inviteusercontroller=async(ctx,next)=>{
    const owneremail=ctx.state.owner
    // console.log(owneremail)
    const email=ctx.request.body.email
    const password=ctx.request.body.password
    const hashpass=hashingpassword(password)
    inviteuseradd(owneremail,email,hashpass)
    return ctx.body={status:true,message:"Data Added Successfully"}
}
module.exports={inviteusercontroller}
