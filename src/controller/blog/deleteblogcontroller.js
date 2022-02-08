const { deleteblog } = require("../../db/query")

const deleteblogcontroller=async(ctx)=>{
    const {blogID}=ctx.request.body
    return{status:true,message:"blog deleted successfully",result:await deleteblog(blogID)}
}
module.exports={deleteblogcontroller}