const {
  register,
  login,
  getusers,
  updateuser,
  deleteuser,
} = require("./Controllers/Usercontroller");

const {
  addproject,
  getprojects,
  updateprojectinfo,
  getprojectinfo,
} = require("./Controllers/Projectcontroller");

const router = require("express").Router();

router.post("/register", register);
router.post("/login", login);
router.get("/getusers", getusers);
router.post("/updateuser", updateuser);
router.post("/deleteuser", deleteuser);
router.post("/addproject", addproject);
router.get("/getprojects", getprojects);
router.post("/updateprojectinfo", updateprojectinfo);
router.post("/getprojectinfo", getprojectinfo);

module.exports = router;
