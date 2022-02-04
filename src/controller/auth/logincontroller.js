const { generatetoken } = require("../../helper/token");


const logincontroller=(ctx)=>{
    const email=ctx.request.body.email;
    const gentoken=generatetoken({email})
        return ctx.body={status:true,message:{gentoken}}
}
module.exports={logincontroller}