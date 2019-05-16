const Product = require("../models/product");

module.exports.postAddProduct = (req, res, next) => {
  console.log("Admin add pro", req);
  const title = req.body.title;
  const price = req.body.price;
  const imgUrl = req.body.url;
  const desc = req.body.desc;
  product = new Product(title, price, imgUrl, desc);
  product
    .save()
    .then(result => {
      if (result) {
        res.render("forms/addproduct", {
          pageTitle: "Product Add",
          path: "/form/addprod",
          message: "Added Successfully"
        });
        if (!result) {
          res.redirect("/");
        }
      }
    })
    .catch(err => {
      console.log(err);
    });
  // next();
};
