const  generatetoken  = require("../../helper/token");


const logincontroller=(ctx)=>{
    // console.log("in controller")
    const {email}=ctx.request.body;
    const gentoken=generatetoken.generatetoken({email})
        return ctx.body={status:true,message:{gentoken}}
}
module.exports={logincontroller}