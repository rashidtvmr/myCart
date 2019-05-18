const Users = require("../models/userData");
const Product = require("../models/product");
const { validationResult } = require("express-validator/check");
const bcrypt = require("bcrypt");
module.exports.getLoginForm = (req, res, next) => {
  res.render("forms/login", {
    pageTitle: "Login",
    path: "/form/login",
    message: false,
    isAuthenticated: req.session.isLoggedin // Boolean()
  });
};

module.exports.getSignupForm = (req, res, next) => {
  res.render("forms/signup", {
    pageTitle: "Register",
    path: "/form/signup",
    message: false,
    isAuthenticated: req.session.isLoggedin // Boolean()
  });
};

module.exports.getAddProduct = (req, res, next) => {
  res.render("forms/addproduct", {
    pageTitle: "Product Add",
    path: "/form/addprod",
    message: false,
    isAuthenticated: Boolean(req.session.isLoggedin)
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
      message: error.array()[0].msg
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
        message: "Registered Successfully"
      });
    })
    .catch(err => {
      console.log("INside controller->" + err);
      res.status(403).send("Error");
    });
  // }
  // })
  //.catch(er => {
  //console.log(" er in check->" + err);
  // });
};

module.exports.getLogin = (req, res, next) => {
  req.session.isLoggedin = true;
  res.redirect("/");
  // const email = req.body.email;
  // const pass = req.body.password;
  // Users.getUser(email, pass)
  //   .then(result => {
  //     return bcrypt.compare(pass, result.password);
  //   })
  //   .then(isMatch => {
  //     if (isMatch) {
  //       res.setHeader('Set-Cookie', 'isLoggedin=true');
  //       console.log("success =>" + isMatch);
  //       res.status(200).render("Main/main", {
  //         pageTitle: "Main",
  //         path: "/",
  //         result: auth,
  //         message: `Welocome ${auth.email}`
  //       });
  //     }
  //     if (!auth) {
  //       res.render("forms/login", {
  //         pageTitle: "Login",
  //         path: "/form/login",
  //         message: "Invalid email or password"
  //       });
  //     }
  //   })
  //   .catch(err => {
  //     console.log(err);
  //     res.render("forms/login", {
  //       pageTitle: "Login",
  //       path: "/form/login",
  //       message: "E-mail id doesnt exist"
  //     });
  //   });
};

module.exports.getIndex = (req, res, next) => {
  Product.fetchAll()
    .then(product => {
      res.render("index", {
        pageTitle: "carTVMR",
        path: "/",
        result: product,
        edit: false,
        message: `Welocome to CARTvmr`,
        isAuthenticated: Boolean(req.session.isLoggedin)
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
    isAuthenticated: Boolean(req.session.isLoggedin)
  });
};
