const blog = require("../../db/query")

const isblogtitle=(ctx,next)=>{
    const {title}=ctx.request.body
    if(title==undefined)
        return ctx.body={status:false,message:"Enter title to update blog"}
    return next()
}

const isblogdes=(ctx,next)=>{
    const {description}=ctx.request.body
    if(description==undefined)
        return ctx.body={status:false,message:"Enter description to update blog"}
    return next()
}

const isblogid=async(ctx,next)=>{
    const {blogID}=ctx.request.body
    if(blogID==undefined)
    {
        return ctx.body={status:false,message:"Blog ID enter"}
    }
    const blogdata=await blog.isblogidindb(blogID)
    // console.log(blogdata)
    if(blogdata==null)
    {
        return ctx.body={status:false,message:"Blog not present"}   
    }
    ctx.state.blogdata=blogdata
    return next()
}

const isUserAuthorize=(ctx,next)=>{
    const blogdata=ctx.state.blogdata
    const userdata=ctx.state.userdata
    // console.log(blogdata)
    // console.log(userdata)
    if(userdata.level=="o")
    {
        if(blogdata.ownerID==userdata.ownerID)
            return next()
    }
    if(blogdata.createdbyID==userdata.userID)
            return next()
    return ctx.body={status:false,message:"User not Authorize to access blog"}   
}
module.exports={isblogdes,isblogtitle,isblogid,isUserAuthorize}