const { inviteuseradd } = require("../../db/auth")
const { hashingpassword } = require("../../helper/hashing")
const { generatetoken } = require("../../helper/token")

const inviteusercontroller=async(ctx)=>{
    const owneremail=ctx.state.userdata.email
    // console.log(owneremail)
    const token=generatetoken({owneremail})
 return ctx.body={status:true,message:`http://localhost:3000/inviteaccept?token=${token}`}
}
module.exports={inviteusercontroller}
