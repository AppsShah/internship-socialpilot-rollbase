const { istitleindb } = require("../../db/query")

const ispermissionnull=(ctx,next)=>{
    const permission=ctx.request.body.permission
    const title=ctx.request.body.title
    if(permission==undefined)
        return ctx.body={success:false,message:"please give permission for blog"}
    if(title==undefined)
        return ctx.body={success:false,message:"please Enter title to give permission"}
    return next()
}
const isauthforpermission=async(ctx,next)=>{
    const title=ctx.request.body.title
    const data=ctx.state.userdata;
    // console.log(data)
    let dbdata=await istitleindb(title)
    console.log(dbdata)
    if(dbdata==null)
        return ctx.body={success:false,message:"NO Title Found"}
    if(dbdata.email==data.email || dbdata.email==data.owneremail || dbdata.owneremail==data.email)
        return next()
    return ctx.body={success:false,message:"User do not have access "}
}
module.exports={ispermissionnull,isauthforpermission}