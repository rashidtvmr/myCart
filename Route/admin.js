const express = require("express");
const router = express.Router();
const adminController = require("../controller/admin");
const adminAuth = require("../middleware/admin-auth");

// router.get("/editPage", adminController.getEditPage);
//post /admin/addproduct
router.post("/addproduct", adminAuth, adminController.postAddProduct);

//   /admin/getEditForm/
router.post("/getEditForm/:id", adminAuth, adminController.getEditProduct);

///admin/getDeleteProduct/<%=product._id%>

router.post(
  "/postDeleteProduct/:prodId",
  adminAuth,
  adminController.postDeleteProduct
);
// /admin/postEditProduct/
router.post("/postEditProduct/:id", adminAuth, adminController.postEditProduct);
// /admin/getLogout

//  /admin/editPage
router.get("/addproduct", adminAuth, adminController.getAddProduct);
module.exports = router;
