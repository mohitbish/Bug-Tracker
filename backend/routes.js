const upload = require("./multer");

const {
  register,
  login,
  getusers,
  updateuser,
  deleteuser,
  updateprofile,
} = require("./Controllers/Usercontroller");

const {
  addproject,
  getprojects,
  updateprojectinfo,
  getprojectinfo,
  addusertoproject,
  removeformproject,
  deleteproject,
} = require("./Controllers/Projectcontroller");

const { addticket,gettickets} = require("./Controllers/TicketController");

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
router.post("/addusertoproject", addusertoproject);
router.post("/removeformproject", removeformproject);
router.post("/deleteproject", deleteproject);
router.post("/updateprofile", updateprofile);
router.post("/addticket",upload.single('file'), addticket);
router.get("/gettickets", gettickets);
module.exports = router;
