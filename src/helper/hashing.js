const bcrypt=require("bcrypt")

const hashingpassword=(password)=>bcrypt.hashSync(password,10)

const hashingpasswordverify=async(password,dbpass)=> bcrypt.compare(password,dbpass)


module.exports={hashingpassword,hashingpasswordverify}