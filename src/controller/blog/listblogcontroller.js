const { listblog, listblogforowner, listblogforteam } = require("../../db/query")

const listblogcontroller=async(ctx)=>{
    const email=ctx.state.userdata.email
    const owneremail=ctx.state.userdata.owneremail || email
    const currentpage=1
    const limit=10
    const skip=(currentpage-1)*limit
    if(ctx.state.userdata.level=="o")
        return ctx.body={status:true,message:await listblogforowner(owneremail,limit,skip)}
    return ctx.body={status:true,message:await listblogforteam(email,limit,skip)}
}
module.exports={listblogcontroller}