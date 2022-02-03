const jwt=require("jsonwebtoken")
const key="HelloAppsHowAreYouAreYouFine"


const generatetoken=(token)=>{
    return jwt.sign(token,key,{ expiresIn:"24h"})
 }

 const verifytoken=(token)=>{
    return jwt.verify(token,key,(err,decoded)=>{
        if(err!=null)
        {
            return err
        }
        else
        {
           return decoded
        }
    })
}
module.exports={generatetoken,verifytoken}