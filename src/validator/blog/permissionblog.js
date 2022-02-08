const { isblogidindb } = require("../../db/query")


const ispermissionnull=(ctx,next)=>{
    const {permission,blogID}=ctx.request.body
    // const blogID=ctx.request.body.blogID
    console.log(permission)
    console.log(typeof(permission))
    if(permission==undefined)
        return ctx.body={success:false,message:"please give permission for blog"}
    if(typeof(permission)!="boolean")
        return ctx.body={success:false,message:"please give permission in true or false in boolean"}
    if(blogID==undefined)
        return ctx.body={success:false,message:"please Enter blogID to give permission"}
    return next()
}
module.exports={ispermissionnull}