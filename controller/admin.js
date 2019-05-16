const Product = require("../models/product");
const ObjectId = require("mongodb").ObjectID;

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
module.exports.getEditProduct = (req, res, next) => {
  const id = req.params.id;
  console.log("Searching for->" + id);
  Product.getById(id)
    .then(result => {
      console.log("res inside admin contr->" + result);
      if (result) {
        res.render("forms/editprod.ejs", {
          pageTitle: "Edit Product",
          path: "/",
          message: false,
          prod: result
        });
      }
    })
    .catch(err => {
      console.log(err);
    });
};

module.exports.postEditProduct = (req, res, next) => {
  const id = req.params.id;
  const title = req.body.title;
  const price = req.body.price;
  const imgUrl = req.body.url;
  const desc = req.body.desc;
  product = new Product(title, price, imgUrl, desc, new ObjectId(id));
  product
    .save()
    .then(result => {
      res.render("index", {
        pageTitle: "carTVMR",
        path: "/",
        result: [product],
        edit: false,
        message: `Edited Product`
      });
    })
    .catch(err => {
      console.log(err);
    });
};
module.exports.getEditPage = (req, res, next) => {
  Product.fetchAll()
    .then(product => {
      res.render("index", {
        pageTitle: "carTVMR",
        path: "/",
        result: product,
        edit: true,
        message: `Welocome to CARTvmr`
      });
    })
    .catch(err => {
      console.log(err);
    });
};
