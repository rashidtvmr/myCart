const express = require("express");
const router = express.Router();
const controller = require("../controller/user");

router.get("/", controller.getSignupForm);
module.exports = router;
