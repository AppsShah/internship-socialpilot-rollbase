const mongoclient = require("../db/connection");


//signup new user
const signup=(username,email,password,photourl,ownerID,userID)=> mongoclient
.db("rollbase")
.collection("user")
.insertOne({username,email, password,level:"o",photourl,ownerID,userID});

//is Email present in db
const isEmailindb=(email)=>mongoclient
.db("rollbase")
.collection("user").findOne({email})

//is invite user add
const inviteuseradd=(ownerID,username,email,password,photourl,userID)=> mongoclient
.db("rollbase")
.collection("user")
.insertOne({ownerID,username,email, password,level:"t",photourl,userID});

//to reset password
const resetpassword=(id,newpassword)=>mongoclient
.db("rollbase")
.collection("user")
.updateOne({ _id: id }, { $set: { password: newpassword } });

module.exports={signup,isEmailindb,inviteuseradd,resetpassword}