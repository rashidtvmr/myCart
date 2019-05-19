const Product = require("../models/product");
const ObjectId = require("mongodb").ObjectID;
module.exports.getLogout = (req, res, next) => {
  req.session.destroy();
  res.redirect("/");
};
module.exports.postAddProduct = (req, res, next) => {
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
          message: "Added Successfully",
          isAuthenticated: req.session.isLoggedin,
          isAdmin: req.session.isAdmin
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
          prod: result,
          isAuthenticated: req.session.isLoggedin,
          isAdmin: req.session.isAdmin
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
        message: `Edited Product`,
        isAuthenticated: req.session.isLoggedin,
        isAdmin: req.session.isAdmin
      });
    })
    .catch(err => {
      console.log(err);
    });
};
module.exports.getEditPage = (req, res, next) => {
  // Product.fetchAll()
  //   .then(product => {
  //     res.render("index", {
  //       pageTitle: "carTVMR",
  //       path: "/",
  //       result: product,
  //       edit: true,
  //       message: `Welocome to CARTvmr`,
  //       isAuthenticated: req.session.isLoggedin,
  //       isAdmin: req.session.isAdmin
  //     });
  //   })
  //   .catch(err => {
  //     console.log(err);
  //   });
  Product.fetchAll()
    .then(product => {
      res.render("index", {
        pageTitle: "carTVMR",
        path: "/",
        result: product,
        message: `Welocome to CARTvmr`,
        isAuthenticated: req.session.isLoggedin,
        isAdmin: req.session.isAdmin
      });
    })
    .catch(err => {
      console.log(err);
    });
};

// adminController.getProductDetail;
module.exports.getProductDetail = (req, res, next) => {
  const id = req.params.prodId;
  console.log("detail for->" + id);
  Product.getById(id)
    .then(result => {
      console.log("res inside admin contr->" + result);
      if (result) {
        res.render("forms/prodDetail.ejs", {
          pageTitle: result.title,
          path: "/",
          message: false,
          product: result,
          isAuthenticated: req.session.isLoggedin,
          isAdmin: req.session.isAdmin
        });
      }
    })
    .catch(err => {
      console.log(err);
    });
};

module.exports.postDeleteProduct = (req, res, next) => {
  const id = req.params.prodId;
  Product.deleteById(new ObjectId(id))
    .then(result => {
      if (result) res.redirect("/");
      else res.redirect("/form/editPage");
    })
    .catch(err => {
      console.log(err);
    });
};
