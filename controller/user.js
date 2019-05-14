const Users = require("../models/userData");
module.exports.getLoginForm = (req, res, next) => {
  res.render("login", {
    pageTitle: "Login",
    path: "/form/login"
  });
};
module.exports.getSignupForm = (req, res, next) => {
  res.render("signup", {
    pageTitle: "Register",
    path: "/form/signup"
  });
};
module.exports.registerUser = (req, res, next) => {
  const email = req.body.email;
  const pass = req.body.password;
  const user = new Users(email, pass);
  user.save();
  res.status(200).render("signup", {
    pageTitle: "signup",
    path: "/signup"
  });
};
module.exports.getLogin = (req, res, next) => {
  const email = req.body.email;
  const pass = req.body.password;
  Users.fetchUsers(users => {
    //console.log(users);
    const result = users.filter(user => {
      return user.email == email && user.password == pass;
    });
    console.log("result" + result);

    if (users) {
      res.status(200).render("Main/main", {
        pageTitle: "Main",
        path: "/login"
      });
    } else {
      res.status(404).render("login", {
        pageTitle: "Invalid User",
        path: "/something"
      });
    }
  });
};
module.exports.getIndex = (req, res, next) => {
  const users = Users.fetchUsers(user => user);
  console.log(users);
  res.render("index", {
    pageTitle: "Home",
    path: "/"
  });
};
module.exports.get404 = (req, res, next) => {
  res.status(404).render("404", {
    pageTitle: "Page not found",
    path: "/something"
  });
};
