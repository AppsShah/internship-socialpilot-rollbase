const mongoclient = require("../db/connection");

//create blog
const createblog=(ownerID,createdbyID,title,description,blogID)=> mongoclient
.db("rollbase")
.collection("blog").insertOne({ownerID,createdbyID,title,description,isApproved:false,createOn:new Date(),updateOn:new Date(),blogID})

//list of blog
const listblogforowner=(ownerID,limit,skip,search,sort)=>mongoclient
.db("rollbase")
.collection("blog").aggregate([
    {
        //stage 0
        $match:{ownerID}
    },
    {
    //stage 1
    $lookup:{
        from:"user",
        localField:"createdbyID",
        foreignField:"userID",
        as:"userData"
    }
},
{
    $unwind : "$userData"
},
    //stage 2
    {
        $sort:{sort:-1}
    },
    {
      $match : {$and:[{$or:[{title:{$regex:search}},{"userData.username":{$regex:search}}]},{ownerID}]}
    }
]).limit(limit).skip(skip).toArray()

//list for team
const listblogforteam=(createdbyID,limit,skip,search,sort)=>mongoclient
    .db("rollbase")
    .collection("blog").aggregate([
    {
        $match:{createdbyID}
    },
    {
        $lookup:{
            from:"user",
            localField:"userID",
            foreignField:"userID",
            as:"userData"
        }
    },
    {
        $unwind : "$userData"
    }
    ,{
        $sort:{sort:-1}
    },
    {
        $and:[{$or:[{title:{$regex:search}},{"userData.username":{$regex:search}}]},{createdbyID}]
    }
]).limit(limit).skip(skip).toArray()
    // .find({$or:[
    //     {isApproved:true},{createdbyID}]}).sort({createOn:-1}).limit(limit).skip(skip).toArray()

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

//approve blog
const approveblog=(blogID,permission)=>mongoclient.db("rollbase")
.collection("blog").updateOne({blogID},{$set:{isApproved:permission}})

//view blog
const viewblog=(blogID)=>mongoclient
.db("rollbase")
.collection("blog").findOne({blogID})

//search blog
const searchblogforowner=(ownerID,search)=>mongoclient.db("rollbase").collection("blog").aggregate([
    //stage 1
    {$match:{ownerID}},
    {
        $lookup:{
            from:"user",
            localField:"userID",
            foreignField:"userID",
            as:"userData"
        }
    },
    {
        $and:[{$or:[{title:{$regex:search}},{"userData.username":{$regex:search}}]},{ownerID}]
    }
])
// .find({$and:[{title:{$regex:search}},{ownerID}]}).toArray()

//search blog for team
const searchblogforteam=(createdbyID,search)=>mongoclient.db("rollbase").collection("blog").aggregate([
    //stage 1
    {$match:{createdbyID}},
    {
        $lookup:{
            from:"user",
            localField:"userID",
            foreignField:"userID",
            as:"userData"
        }
    },
    {
        $and:[{$or:[{title:{$regex:search}},{"userData.username":{$regex:search}}]},{createdbyID}]
    }
])
// .find({$and:[{title:{$regex:search}},{createdbyID}]}).toArray()


module.exports={createblog,listblogforowner,listblogforteam,isblogidindb,updateblog,deleteblog,approveblog,viewblog,searchblogforteam,searchblogforowner}