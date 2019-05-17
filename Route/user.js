const express = require("express");
const router = express.Router();
const controller = require("../controller/user");
const adminController = require("../controller/admin");

router.get("/login", controller.getLoginForm);

router.get("/signup", controller.getSignupForm);

router.get("/addproduct", controller.getAddProduct);

// form/getprod/5cdd963cb392d829f8d0f616

module.exports = router;
