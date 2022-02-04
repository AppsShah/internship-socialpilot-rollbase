const {uuid}=require("uuidv4");
const { createblog } = require("../../db/query");
const createblogcontroller=async(ctx)=>{
    const blogID=uuid()
    const createbyemail=ctx.state.userdata.email
    const owneremail=ctx.state.userdata.owneremail || createbyemail;
    const title=ctx.request.body.title
    const des=ctx.request.body.description
    return ctx.body={status:true,message:await createblog(owneremail,createbyemail,title,des,blogID)}

}
module.exports={createblogcontroller}