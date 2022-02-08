const koarouter=require("koa-router");
const { createblogcontroller } = require("../controller/blog/createblogcontroller");
const { listblogcontroller } = require("../controller/blog/listblogcontroller");
const { updateblogcontroller } = require("../controller/blog/updateblogcontroller");
const { istokenverify } = require("../middleware/istokenverify");
const { istitlevalid, isdesvalid} = require("../validator/blog/createblogvalidator");
const {ispermissionnull} = require("../validator/blog/permissionblog");
const {isblogtitle, isblogdes, isblogid, isUserAuthorize } = require("../validator/blog/helper validator");
const { deleteblogcontroller } = require("../controller/blog/deleteblogcontroller");
const { permissionblogcontroller } = require("../controller/blog/permissionblogcontroller");
const { viewcontroller } = require("../controller/blog/viewcontroller");
const { searchblogvalidator } = require("../validator/blog/searchblogvalidator");
const { isparam } = require("../validator/blog/isparam");
const router=new koarouter({prefix:"/blog"});

router.post("/create",istokenverify,istitlevalid,isdesvalid,createblogcontroller)

router.patch("/update",istokenverify,isblogid,isUserAuthorize,isblogtitle,isblogdes,updateblogcontroller)

router.delete("/delete",istokenverify,isblogid,isUserAuthorize,deleteblogcontroller)

router.patch("/permissionblog",istokenverify,ispermissionnull,isblogid,isUserAuthorize,permissionblogcontroller)

router.get("/view",istokenverify,isblogid,isUserAuthorize,viewcontroller)

router.get("/list",istokenverify,isparam,listblogcontroller)

// router.post("/search",istokenverify,searchblogvalidator)

module.exports=router