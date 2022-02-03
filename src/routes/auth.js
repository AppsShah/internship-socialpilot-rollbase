const koarouter = require("koa-router");
const { forgetpasswordcontroller } = require("../controller/auth/forgetpasswordcontroller");
const { inviteusercontroller } = require("../controller/auth/inviteusercontroller");
const { logincontroller } = require("../controller/auth/logincontroller");
const { resetpasswordcontroller } = require("../controller/auth/resetpasswordcontroller");
const { signupconttroller } = require("../controller/auth/signupcontroller");
const { forgetpasswordisemail } = require("../validator/auth/forgetpasswordvalidator");
const { loginisemail, loginispassword } = require("../validator/auth/loginvalidator");
const { resetpasswordverify } = require("../validator/auth/resetpasswordvalidator");
const {
  signupisemail,
  signuppassword,
} = require("../validator/auth/signupvalidator");
const { inviteistokenexpire, inviteisemail, inviteispassword } = require("../validator/auth/userinvitevalidator");
const router = new koarouter();

//signup
router.post("/signup", signupisemail, signuppassword, signupconttroller);

// login
router.post("/login",loginisemail,loginispassword,logincontroller);

// forgetpassword
router.post("/forgetpassword",forgetpasswordisemail,forgetpasswordcontroller);

//resetpassword
router.post("/resetpassword",resetpasswordverify,resetpasswordcontroller);

//invite user
router.post("/invite",inviteistokenexpire,inviteisemail,inviteispassword,inviteusercontroller);

module.exports = router;
