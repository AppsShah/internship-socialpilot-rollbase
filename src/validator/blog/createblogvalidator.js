const istitlevalid=(ctx,next)=>{
        const {title}=ctx.request.body
        if(title==undefined)
            return ctx.body={status:false,message:"Enter title to create blog"}
        return next()
}

const isdesvalid=(ctx,next)=>{
    const {description}=ctx.request.body
    if(description==undefined)
        return ctx.body={status:false,message:"Enter description to create blog"}
    return next()
}



module.exports={istitlevalid,isdesvalid}
