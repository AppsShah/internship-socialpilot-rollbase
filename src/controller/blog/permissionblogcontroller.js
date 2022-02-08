const { approveblog } = require("../../db/query")

const permissionblogcontroller=async(ctx,next)=>{
    const {permission,blogID}=ctx.request.body
    // const blogID}=ctx.request.body
    return ctx.body={status:true,message:await approveblog(blogID,permission)}
}
module.exports={permissionblogcontroller}