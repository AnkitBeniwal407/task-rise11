const { Router } = require("express");
const { SignIn, SignUp } = require("../controller/User");

const router = Router();

router.route("/signin").post(SignIn);
router.post("/signup", SignUp);

module.exports = router;
