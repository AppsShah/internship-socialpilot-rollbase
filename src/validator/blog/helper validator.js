const { isblogidindb } = require("../../db/query")

const isblogtitle=(ctx,next)=>{
    const title=ctx.request.body.title
    if(title==undefined)
        return ctx.body={status:false,message:"Enter title to update blog"}
    return next()
}

const isblogdes=(ctx,next)=>{
    const description=ctx.request.body.description
    if(description==undefined)
        return ctx.body={status:false,message:"Enter description to update blog"}
    return next()
}

const isblogid=async(ctx,next)=>{
    const blogID=ctx.request.body.blogID
    if(blogID==undefined)
    {
        return ctx.body={status:false,message:"Blog ID enter to update"}
    }
    const blogdata=await isblogidindb(blogID)
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
    if(blogdata.createdbyemail==userdata.email || blogdata.owneremail==userdata.email)
            return next()
    return ctx.body={status:false,message:"User not Authorize to access blog"}   
}
module.exports={isblogdes,isblogtitle,isblogid,isUserAuthorize}