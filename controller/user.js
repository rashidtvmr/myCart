const Users = require("../models/userData");
const Product = require("../models/product");
const { validationResult } = require("express-validator/check");
const bcrypt = require("bcrypt");
module.exports.getLoginForm = (req, res, next) => {
  res.render("forms/login", {
    pageTitle: "Login",
    path: "/form/login",
    message: false,
    isAuthenticated: req.session.isLoggedin,
    isAdmin: req.session.isAdmin // Boolean()
  });
};

module.exports.getSignupForm = (req, res, next) => {
  res.render("forms/signup", {
    pageTitle: "Register",
    path: "/form/signup",
    message: false,
    isAuthenticated: req.session.isLoggedin,
    isAdmin: req.session.isAdmin // Boolean()
  });
};

module.exports.getAddProduct = (req, res, next) => {
  res.render("forms/addproduct", {
    pageTitle: "Product Add",
    path: "/form/addprod",
    message: false,
    isAuthenticated: req.session.isLoggedin,
    isAdmin: req.session.isAdmin
  });
};

module.exports.registerUser = (req, res, next) => {
  const email = req.body.email;
  let pass = req.body.password;
  let error = validationResult(req);
  if (!error.isEmpty()) {
    res.status(422).render("forms/signup", {
      pageTitle: "Register",
      path: "/signup",
      message: error.array()[0].msg,
      isAuthenticated: req.session.isLoggedin,
      isAdmin: req.session.isAdmin
    });
  }
  // Users.getUser(email)
  //   .then(ress => {
  //     console.log(ress);
  //     if (ress) {
  //       res.status(200).render("forms/signup", {
  //         pageTitle: "Register",
  //         path: "/signup",
  //         message: "E-mail already exist"
  //       });
  //     }
  // if (!ress) {
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
        message: "Registered Successfully",
        isAuthenticated: req.session.isLoggedin,
        isAdmin: req.session.isAdmin
      });
    })
    .catch(err => {
      console.log("Inside controller(post register)->" + err);
    });
  // }
  // })
  //.catch(er => {
  //console.log(" er in check->" + err);
  // });
};

module.exports.getLogin = (req, res, next) => {
  const email = req.body.email;
  const pass = req.body.password;
  let error = validationResult(req);
  if (!error.isEmpty()) {
    console.log("validation error while login->" + error.array());
    res.status(422).render("forms/login", {
      pageTitle: "Log in",
      path: "/signin",
      message: error.array()[0].msg,
      isAuthenticated: req.session.isLoggedin,
      isAdmin: req.session.isAdmin
    });
  }
  if (error.isEmpty()) {
    let isAdmin;
    Users.getUser(email, pass)
      .then(result => {
        if (result) {
          isAdmin = Boolean(result.hasOwnProperty("isAdmin"));
          console.log("isadmin->" + isAdmin);
          bcrypt
            .compare(pass, result.password)
            .then(isMatch => {
              if (isMatch) {
                console.log("nested isad" + isAdmin);
                if (isAdmin) {
                  req.session.isAdmin = isAdmin;
                }
                // res.setHeader("Set-Cookie", "isLoggedin=true");
                req.session.isLoggedin = true;
                console.log("success =>" + isMatch);
                res.redirect("/");
                // res.status(200).render("Main/main", {
                //   pageTitle: "Main",
                //   path: "/",
                //   result: isMatch,
                //   message: `Welocome ${isMatch.email}`,
                //   isAuthenticated: req.session.isAuthenticated,
                //   isAdmin: req.session.isAdmin
                // });
              }
              if (!isMatch) {
                res.render("forms/login", {
                  pageTitle: "Login",
                  path: "/form/login",
                  message: "Invalid email or password",
                  isAuthenticated: req.session.isLoggedin,
                  isAdmin: req.session.isAdmin
                });
              }
            })
            .catch(err => {
              console.log(err);
            });
        }
      })
      .catch(err => {
        console.log(err);
      });
  }
};

module.exports.getIndex = (req, res, next) => {
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
// module.exports.getPostCart = (req, res, next) => {
//   next();
// };

module.exports.get404 = (req, res, next) => {
  res.status(404).render("404", {
    pageTitle: "Page not found",
    path: "/something",
    isAuthenticated: req.session.isLoggedin,
    isAdmin: req.session.isAdmin
  });
};
