const { signup } = require("../../db/auth")
const { hashingpassword } = require("../../helper/hashing")
const { v4: uuidv4 } = require('uuid')
const { v4 } = require("uuid")

const signupconttroller=async(ctx)=>{
    const {username,email,password,photourl}=ctx.request.body
    // const email=(ctx.request.body.email).toLowerCase()
    // const password=ctx.request.body.password
    const hashpassword=hashingpassword(password)
    // const photourl=ctx.request.body.photourl
    const ownerID=v4()
    const userID=ownerID
    console.log(ownerID)
    await signup(username,email,hashpassword,photourl,ownerID,userID)
    ctx.body={status:true,message:"Data Added Successfully"}
}
module.exports={signupconttroller}