const mongoclient = require("../db/connection");

//signup new user
const signup=(email,password)=> mongoclient
.db("rollbase")
.collection("user")
.insertOne({email, password,level:"o"});

const isEmailindb=(email)=>mongoclient
.db("rollbase")
.collection("user").findOne({email})

const inviteuseradd=(owneremail,email,password)=> mongoclient
.db("rollbase")
.collection("user")
.insertOne({owneremail,email, password,level:"t"});

const resetpassword=(id,newpassword)=>mongoclient
.db("rollbase")
.collection("user")
.updateOne({ _id: id }, { $set: { password: newpassword } });

module.exports={signup,isEmailindb,inviteuseradd,resetpassword}