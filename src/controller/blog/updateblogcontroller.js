const { updateblog } = require("../../db/query")

const updateblogcontroller=async(ctx)=>{
    const blogID=ctx.request.body.blogID
    const title=ctx.request.body.title
    const description=ctx.request.body.description
    ctx.body={status:true,message:"Update success",blog:await updateblog(blogID,title,description)}
}
module.exports={updateblogcontroller}