const Users = require("../models/userData");
const bcrypt = require("bcrypt");
module.exports.getLoginForm = (req, res, next) => {
  res.render("login", {
    pageTitle: "Login",
    path: "/form/login"
  });
};
module.exports.getSignupForm = (req, res, next) => {
  res.render("signup", {
    pageTitle: "Register",
    path: "/form/signup",
    message: null
  });
};
module.exports.registerUser = (req, res, next) => {
  const email = req.body.email;
  let pass = req.body.password;
  let userExist = Users.Check(email)
    .then(ress => {
      console.log(ress);
      if (ress) {
        res.status(200).render("signup", {
          pageTitle: "Register",
          path: "/signup",
          message: "E-mail already exist"
        });
        console.log("true");
      }
      if (!ress) {
        console.log("false");
        bcrypt
          .hash(pass, 12)
          .then(pass2 => {
            const user = new Users(email, pass2);
            return user.save();
          })
          .then(result => {
            // console.log(result);

            res.status(200).render("signup", {
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
      return ress;
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
      if (!result) {
        console.log("email or password doesnt exist");
        res.redirect("/form/login");
      }
      return bcrypt.compare(pass, result.password);
    })
    .then(auth => {
      if (auth) {
        console.log("success =>" + result);
        res.status(200).render("index", {
          pageTitle: "carTVMR",
          path: "/",
          result: [result],
          message: `Welocome ${result.email}`
        });
      }
    })
    .catch(err => {
      console.log(err);
    });
};

// Users.fetchUsers(res => {

// });
// Users.fetchUsers(users => {
//   //console.log(users);
//   const result = users.filter(user => {
//     return user.email == email && user.password == pass;
//   });
//   console.log("result" + result);

//   if (users) {
//     res.status(200).render("Main/main", {
//       pageTitle: "carTVMR",
//       path: "/login"
//     });
//   } else {
//     res.status(404).render("login", {
//       pageTitle: "Invalid User",
//       path: "/something"
//     });
//   }
// });
// res.render("index", {
//   pageTitle: "Home",
//   path: "/something",
//   result: "Logged in"
// });
// };
module.exports.getIndex = (req, res, next) => {
  Users.fetchUsers()
    .then(users => {
      console.log("User Email" + users[0].email);
      res.render("index", {
        pageTitle: "carTVMR",
        path: "/",
        result: users,
        message: `Welocome to CARTvmr`
      });
    })
    .catch(err => {
      console.log(err);
    });
};
module.exports.get404 = (req, res, next) => {
  res.status(404).render("404", {
    pageTitle: "Page not found",
    path: "/something"
  });
};
