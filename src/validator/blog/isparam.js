
const isparam=(ctx,next)=>{
    const {sort}=ctx.query || "date"
    const {search}=ctx.query
    console.log(sort)
    if(sort=="username" || sort=="date") 
    {
        ctx.state.searchsort={sort,search}
        return next()
    }
    return ctx.body={status:false,message:"please enter sort username or date"}
}
module.exports={isparam}