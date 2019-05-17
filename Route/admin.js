const express = require("express");
const router = express.Router();
const adminController = require("../controller/admin");

router.get("/editPage", adminController.getEditPage);
//post /admin/addproduct
router.post("/addproduct", adminController.postAddProduct);

router.get("/getprod/:prodId", adminController.getProductDetail);
//   /admin/getEditForm/
router.post("/getEditForm/:id", adminController.getEditProduct);

// /admin/postEditProduct/
router.post("/postEditProduct/:id", adminController.postEditProduct);

//  /admin/editPage

module.exports = router;
