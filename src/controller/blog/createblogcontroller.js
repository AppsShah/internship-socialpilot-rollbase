const { v4: uuidv4 } = require('uuid')
const { v4 } = require("uuid")
const { createblog } = require("../../db/query");
const createblogcontroller=async(ctx)=>{
    const blogID=v4()
    const ownerID=ctx.state.userdata.ownerID ;
    const createbyID=ctx.state.userdata.userID
    const {title,description}=ctx.request.body
    // const des=ctx.request.body.description
    return ctx.body={status:true,created_by:ctx.state.userdata.email,message:await createblog(ownerID,createbyID,title,description,blogID)}

}
module.exports={createblogcontroller}