const Users = require("../models/userData");
const Product = require("../models/product");
const bcrypt = require("bcrypt");
module.exports.getLoginForm = (req, res, next) => {
  res.render("forms/login", {
    pageTitle: "Login",
    path: "/form/login",
    message: false
  });
};

module.exports.getSignupForm = (req, res, next) => {
  res.render("forms/signup", {
    pageTitle: "Register",
    path: "/form/signup",
    message: false
  });
};

module.exports.getAddProduct = (req, res, next) => {
  res.render("forms/addproduct", {
    pageTitle: "Product Add",
    path: "/form/addprod",
    message: false
  });
};

module.exports.registerUser = (req, res, next) => {
  const email = req.body.email;
  let pass = req.body.password;
  Users.getUser(email)
    .then(ress => {
      console.log(ress);
      if (ress) {
        res.status(200).render("forms/signup", {
          pageTitle: "Register",
          path: "/signup",
          message: "E-mail already exist"
        });
      }
      if (!ress) {
        bcrypt
          .hash(pass, 12)
          .then(pass2 => {
            const user = new Users(email, pass2);
            return user.save();
          })
          .then(result => {
            res.status(200).render("forms/signup", {
              pageTitle: "Register",
              path: "/signup",
              message: "Registered Successfully"
            });
          })
          .catch(err => {
            console.log("INside controller->" + err);
            res.status(403).send("Error");
          });
      }
    })
    .catch(er => {
      console.log(" er in check->" + err);
    });
};

module.exports.getLogin = (req, res, next) => {
  const email = req.body.email;
  const pass = req.body.password;
  Users.getUser(email, pass)
    .then(result => {
      return bcrypt.compare(pass, result.password);
    })
    .then(auth => {
      if (auth) {
        console.log("success =>" + auth);
        res.status(200).render("Main/main", {
          pageTitle: "Main",
          path: "/",
          result: auth,
          message: `Welocome ${auth.email}`
        });
      }
      if (!auth) {
        res.render("forms/login", {
          pageTitle: "Login",
          path: "/form/login",
          message: "Invalid email or password"
        });
      }
    })
    .catch(err => {
      console.log(err);
      res.render("forms/login", {
        pageTitle: "Login",
        path: "/form/login",
        message: "E-mail id doesnt exist"
      });
    });
};

module.exports.getIndex = (req, res, next) => {
  Product.fetchAll()
    .then(product => {
      res.render("index", {
        pageTitle: "carTVMR",
        path: "/",
        result: product,
        edit: false,
        message: `Welocome to CARTvmr`
      });
    })
    .catch(err => {
      console.log(err);
    });
};
module.exports.getPostCart = (req, res, next) => {
  next();
};

module.exports.get404 = (req, res, next) => {
  res.status(404).render("404", {
    pageTitle: "Page not found",
    path: "/something"
  });
};
