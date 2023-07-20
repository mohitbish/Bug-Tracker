const { register} = require("./Controllers/Usercontroller");

const router = require("express").Router();

router.post("/register", register);




module.exports = router;
