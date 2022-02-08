const {  listblogforowner, listblogforteam } = require("../../db/query")

const listblogcontroller=async(ctx)=>{
    const ownerID=ctx.state.userdata.ownerID ;
    const createbyID=ctx.state.userdata.userID || ownerID;
    const sort=ctx.query.sort
    const search=ctx.query.search || ""
    console.log(search)
    // console.log(ctx.state.searchsort)

    // sort need to be dima . - defaul sort is date else base on user input - name
    // seach need to add
    const currentpage=1
    const limit=10
    const skip=(currentpage-1)*limit
    if(ctx.state.userdata.level=="o" && sort=="date")
        return ctx.body={status:true,message:await listblogforowner(ownerID,limit,skip,search,{sort:"createdbyID"})}
    if(ctx.state.userdata.level=="o" && sort=="username")
        return ctx.body={status:true,message:await listblogforowner(ownerID,limit,skip,search,{sort:"userData.username"})}
    if(ctx.state.userdata.level=="t" && sort=="date")
        return ctx.body={status:true,message:await listblogforteam(createbyID,limit,skip,search,{sort:"createdbyID"})}
    return ctx.body={status:true,message:await listblogforowner(ownerID,limit,skip,search,{sort:"userData.username"})}
}
module.exports={listblogcontroller}