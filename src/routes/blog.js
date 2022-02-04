const koarouter=require("koa-router");
const { createblogcontroller } = require("../controller/blog/createblogcontroller");
const { listblogcontroller } = require("../controller/blog/listblogcontroller");
const { updateblogcontroller } = require("../controller/blog/updateblogcontroller");
const { istokenverify } = require("../middleware/istokenverify");
const { istitlevalid, isdesvalid} = require("../validator/blog/createblogvalidator");
const {ispermissionnull, isauthforpermission } = require("../validator/blog/permissionblog");
const {isblogtitle, isblogdes, isblogid, isUserAuthorize } = require("../validator/blog/helper validator");
const { deleteblogcontroller } = require("../controller/blog/deleteblogcontroller");
const router=new koarouter();

router.post("/createblog",istokenverify,istitlevalid,isdesvalid,createblogcontroller)

router.patch("/updateblog",istokenverify,isblogid,isUserAuthorize,isblogtitle,isblogdes,updateblogcontroller)

router.delete("/deleteblog",istokenverify,isblogid,isUserAuthorize,deleteblogcontroller)

router.patch("/permissionblog",istokenverify,ispermissionnull,isauthforpermission)

router.post("/viewblog")

router.get("/listblog",istokenverify,listblogcontroller)

module.exports=router