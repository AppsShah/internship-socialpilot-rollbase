const  authdata = require("../../db/auth");
const axios=require("axios")

const signupisuserrname=(ctx,next)=>{
  const {username}=ctx.request.body
  if(!username)
  {
    return (ctx.body = { status: false, message: "Please Enter Username" });
  }
  return next()
}

const signupisemail = async (ctx, next) => {
  const {email} = ctx.request.body
  if (!email)
    return (ctx.body = { status: false, message: "Please Enter email" });
  const regexp = /\S+@\S+\.\S+/;
  if (!regexp.test(email))
    return (ctx.body = { status: false, message: "Please Enter right Email" });
  const data = await authdata.isEmailindb(email.toLowerCase());
  if (data)
    return (ctx.body = { status: false, message: "user Already present" });
  return next();
};

const signuppassword = (ctx, next) => {
  const {password} = ctx.request.body;
  if (!password)
    return (ctx.body = { status: false, message: "Please Enter password" });

  if (password.length < 8)
    return (ctx.body = {
      status: false,
      message: "Please Enter right password more then 8 char",
    });
  return next();
};



const signupphotourlvalidator=async(ctx,next)=>{
  const photourl=ctx.request.body.photourl
  if(photourl!=null)
  {
      if(!(/(http(s?)):\/\//i).test(photourl))
         return ctx.body={
          status:false,
          message:"Enter Valid Link to save photo",
         }
    try {
      const d= await  axios.head(photourl)
      if(d.headers['content-type']=="image/jpeg")
          return next()
      return ctx.body={
        status:false,
        message:"Enter jpeg/jpg photo only" }
    } catch (error) {
      return ctx.body={
        status:false,
        message:"Enter jpeg/jpg photo only" }
    }
      
  }
  return next()     
}

module.exports = { signupisemail, signuppassword,signupphotourlvalidator ,signupisuserrname};
