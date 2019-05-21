const ObjectId = require("mongodb").ObjectID;
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
  if (error.isEmpty()) {
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
    let user;
    Users.getUser(email, pass)
      .then(result => {
        user = result;
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
                req.session.user = user;
                req.session.isLoggedin = true;
                console.log(
                  "Session initialization-User-isloggedin->",
                  req.session.user,
                  req.session.isLoggedin
                );

                console.log("success =>" + isMatch);
                Product.fetchAll()
                  .then(product => {
                    res.render("index", {
                      pageTitle: "carTVMR",
                      path: "/",
                      result: product,
                      message: `Welocome ${req.session.email}`,
                      isAuthenticated: req.session.isLoggedin,
                      isAdmin: req.session.isAdmin
                    });
                  })
                  .catch(err => {
                    console.log(err);
                  });
                // res.redirect("/");
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
        message: false,
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
module.exports.getLogout = (req, res, next) => {
  req.session.destroy();
  res.redirect("/");
};
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
module.exports.postAddtoCart = (req, res, next) => {
  const id = new ObjectId(req.params.prodId);
  const user = req.session.user;
  // console.log("useridd->", req.session.user.cart);
  Users.addToCart(id, user)
    .then(result => {
      Product.fetchAll()
        .then(product => {
          res.render("index", {
            pageTitle: "carTVMR",
            path: "/",
            result: product,
            message: `Added to cart`,
            isAuthenticated: req.session.isLoggedin,
            isAdmin: req.session.isAdmin
          });
        })
        .catch(err => {
          console.log(err);
        });

      // res.status(200).redirect("/");
      // res.status(200).render("index", {
      //   pageTitle: "carTVMR",
      //   path: "/",
      //   result: [],
      //   message: `Added to cart`,
      //   isAuthenticated: req.session.isLoggedin,
      //   isAdmin: req.session.isAdmin
      // });
    })
    .catch(err => {
      console.log(err);
    });
};

///user/getCart
module.exports.getCart = (req, res, next) => {
  const cartItems = [...req.session.user.cart.items];
  if (cartItems.length == 0) {
    res.status(200).render("Main/cart", {
      pageTitle: "carTVMR",
      path: "/mycart",
      product: [],
      canOrder: false,
      message: `Cart is empty`,
      isAuthenticated: req.session.isLoggedin,
      isAdmin: req.session.isAdmin
    });
  } else {
    let prodArray = cartItems.map(c => {
      return Object.values(c)[0];
    });
    let prodWithQuantity = cartItems.map(c => {
      return Object.values(c);
    });
    let fa, newResult;
    //console.log("Prodwithquan->", prodWithQuantity);
    Product.getCartItems(prodArray)
      .then(result => {
        newResult = result.map(f => {
          prodWithQuantity.forEach(c => {
            if (f._id.toString() === c[0].toString()) {
              fa = Object.assign({}, f, (f.quantity = c[1]));
            }
          });
          //console.log("fa->", fa);
          return fa;
        });
        // console.log("faa->", newResult);
        res.status(200).render("Main/cart", {
          pageTitle: "Cart",
          path: "/mycart",
          product: newResult,
          canOrder: true,
          message: `Cart`,
          isAuthenticated: req.session.isLoggedin,
          isAdmin: req.session.isAdmin
        });
      })
      .catch(err => {
        console.log(err);
      });
  }
};
exports.postRemoveItem = (req, res, next) => {
  const id = new ObjectId(req.params.prodId);
  const user = req.session.user;
  Users.removeCartItem(id, user)
    .then(result => {
      //console.log(result);
      res.redirect("/user/getcart");
    })
    .catch(err => {
      console.log(err);
    });
};
exports.postOrder = (req, res, next) => {};
