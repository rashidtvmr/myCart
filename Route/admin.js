const express = require("express");
const router = express.Router();
const adminController = require("../controller/admin");
//post /admin/addproduct
router.post("/addproduct", adminController.postAddProduct);

module.exports = router;
