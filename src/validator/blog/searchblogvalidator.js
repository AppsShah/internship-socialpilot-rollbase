const { searchblogforteam,searchblogforowner} = require("../../db/query")
const searchblogvalidator=async(ctx)=>{
    const {userdata}=ctx.state
    const {search}=ctx.request.body
    if(search)
        return ctx.body={status:false,message:"Enter search keyword to search blog"}
    if(userdata.level=="o")
        return ctx.body={status:true,message:await searchblogforowner(userdata.ownerID,search)}
    return ctx.body={status:true,message:await searchblogforteam(userdata.userID,search)}
}

module.exports={searchblogvalidator}