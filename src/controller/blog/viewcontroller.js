const blog = require("../../db/query")

const viewcontroller=async(ctx)=>{
    const {blogID}=ctx.request.body
    return ctx.body={status:true,result:await blog.viewblog(blogID)}
}
module.exports={viewcontroller}