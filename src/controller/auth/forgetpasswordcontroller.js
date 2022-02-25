const gentoken = require("../../helper/token")


const forgetpasswordcontroller=(ctx)=>{
    const {email}=ctx.request.body;
     const token=gentoken.generatetoken({email})
     return ctx.body= {
        success:true,
        url:`http://localhost:3000/resetpassword?token=${token}`
               }
}
module.exports={forgetpasswordcontroller}