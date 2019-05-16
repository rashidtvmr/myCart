const express = require("express");
const router = express.Router();
const controller = require("../controller/user");
router.get("/addproduct", controller.getAddProduct);

router.get("/login", controller.getLoginForm);

router.get("/signup", controller.getSignupForm);

module.exports = router;
