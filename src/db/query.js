const mongoclient = require("../db/connection");

//signup new user
const signup=(email,password)=> mongoclient
.db("rollbase")
.collection("user")
.insertOne({email, password,level:"o"});

//is Email present in db
const isEmailindb=(email)=>mongoclient
.db("rollbase")
.collection("user").findOne({email})

//is invite user add
const inviteuseradd=(owneremail,email,password)=> mongoclient
.db("rollbase")
.collection("user")
.insertOne({owneremail,email, password,level:"t"});

//to reset password
const resetpassword=(id,newpassword)=>mongoclient
.db("rollbase")
.collection("user")
.updateOne({ _id: id }, { $set: { password: newpassword } });

//create blog
const createblog=(owneremail,createdbyemail,title,description,blogID)=> mongoclient
.db("rollbase")
.collection("blog").insertOne({owneremail,createdbyemail,title,description,isApproved:false,createOn:new Date(),updateOn:new Date(),blogID})

//list of blog
const listblogforowner=(owneremail,limit,skip)=>mongoclient
.db("rollbase")
.collection("blog").find({$or:[
    {isApproved:true},{owneremail}]}).limit(limit).skip(skip).toArray()

//list for team
const listblogforteam=(createdbyemail,limit,skip)=>mongoclient
    .db("rollbase")
    .collection("blog").find({$or:[
        {isApproved:true},{createdbyemail}]}).limit(limit).skip(skip).toArray()

//is blog in db
const isblogidindb=(blogID)=>mongoclient
.db("rollbase")
.collection("blog").findOne({blogID})

//update blog
const updateblog=(blogID,title,description)=>mongoclient
.db("rollbase")
.collection("blog").updateOne({blogID},{$set:{title,description,updateOn:new Date()}})

//delele blog
const deleteblog=(blogID)=>mongoclient
.db("rollbase")
.collection("blog").deleteOne({blogID})

module.exports={signup,isEmailindb,inviteuseradd,resetpassword,createblog,listblogforowner,listblogforteam,isblogidindb,updateblog,deleteblog}