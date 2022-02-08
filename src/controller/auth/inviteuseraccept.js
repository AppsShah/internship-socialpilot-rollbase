const { inviteuseradd, isEmailindb } = require("../../db/auth")
const { hashingpassword } = require("../../helper/hashing")
const { verifytoken } = require("../../helper/token")
const { v4: uuidv4 } = require('uuid')
const { v4 } = require("uuid")

const invitetokenacceptcontroller=async(ctx)=>{
     const {username,email,password,photourl}=ctx.request.body
    // console.log(ctx.query.token)
        // const email=(ctx.request.body.email).toLowerCase()
        const verifydata=verifytoken(ctx.query.token)
        console.log(verifydata)
        const ownerdetails=await isEmailindb(verifydata.owneremail)
        console.log(ownerdetails)
    // const {password}=ctx.request.body
    const hashpass=hashingpassword(password)
    // const photourl=ctx.request.body.photourl
    const userID=v4()
    const d=await inviteuseradd(ownerdetails.ownerID,username,email.toLowerCase(),hashpass,photourl,userID)
    ctx.body={status:true,message:"User added Successfully"}
}
module.exports={invitetokenacceptcontroller}