const {
  register,
  login,
  getusers,
  updateuser,
  deleteuser,
} = require("./Controllers/Usercontroller");

const router = require("express").Router();

router.post("/register", register);
router.post("/login", login);
router.get("/getusers", getusers);
router.post("/updateuser", updateuser);
router.post("/deleteuser", deleteuser);

module.exports = router;
