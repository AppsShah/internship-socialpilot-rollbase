const isEmailindb = require("../../db/auth");
const axios=require("axios")
const inviteisuserrname=(ctx,next)=>{
  const {username}=ctx.request.body
  if(!username)
  {
    return ctx.body = { status: false, message: "Please Enter Username" };
  }
  return next()
}

const inviteisemail = async (ctx, next) => {
  const { email }= ctx.request.body;
  if (email == undefined)
    return (ctx.body = { status: false, message: "Please Enter email" });
  const regexp = /\S+@\S+\.\S+/;
  if (!regexp.test(String(email).toLowerCase()))
    return (ctx.body = { status: false, message: "Please Enter right Email" });
  const data = await isEmailindb.isEmailindb(email);
  if (data)
    return (ctx.body = { status: false, message: "User Already Present" });
  ctx.state.email = data;
  return next();
};
const inviteispassword = (ctx, next) => {
  const {password} = ctx.request.body;
//   console.log(password)
  if (!password)
    return ctx.body = { status: false, message: "Please Enter password" };

  if (password.length < 8)
    return (ctx.body = {
      status: false,
      message: "Please Enter right password more then 8 char",
    });
  return next();
};

const isinviteteamorowner=(ctx,next)=>{
  const owneremail=ctx.state.userdata
  // console.log(owneremail)
  if(owneremail.level=="o")
      return next()
  return ctx.body={status:false,message:"only owner can create team"}
}

const isinvitephotourl=async(ctx,next)=>{
  const {photourl}=ctx.request.body
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
module.exports = {inviteisemail, inviteispassword ,isinviteteamorowner ,isinvitephotourl,inviteisuserrname};
