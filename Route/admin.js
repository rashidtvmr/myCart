const express = require("express");
const router = express.Router();
const adminController = require("../controller/admin");

// router.get("/editPage", adminController.getEditPage);
//post /admin/addproduct
router.post("/addproduct", adminController.postAddProduct);

//   /admin/getEditForm/
router.post("/getEditForm/:id", adminController.getEditProduct);

///admin/getDeleteProduct/<%=product._id%>

router.post("/postDeleteProduct/:prodId", adminController.postDeleteProduct);
// /admin/postEditProduct/
router.post("/postEditProduct/:id", adminController.postEditProduct);
// /admin/getLogout

//  /admin/editPage
router.get("/addproduct", adminController.getAddProduct);
module.exports = router;
