const dbConnect = require("./data/User").dbConnect;
const express = require("express");
const bodyParser = require("body-parser");

const app = express();
const session = require("express-session");
const MongodbSession = require("connect-mongodb-session")(session);
const { body } = require("express-validator/check");
const getdb = require("./data/User").getdb;
const PORT = process.env.PORT || 8080;
const URI =
  "mongodb+srv://rashidtvmr:Mass94877348@mycluster-ztbvh.mongodb.net/myDb";

app.set("view engine", "ejs");
app.set("views", "views");

const store = new MongodbSession({
  uri: URI,
  collection: "sessions"
});

app.use(
  session({
    secret: "No one is perfect",
    resave: false,
    saveUninitialized: false,
    store: store
  })
);

const userRoute = require("./Route/user");
const adminRoute = require("./Route/admin");
// const cartRouter = require("./Route/cart.js");
const controller = require("./controller/user");
//const Data = signup.Data;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static("./public"));

///form/getprod/:prodId
app.use("/form", userRoute);

app.use("/admin", adminRoute);

//post /admin/addproduct
// app.use("/form/addproduct", controller.getAddProduct);
app.use(
  "/signup",
  body("email")
    .trim()
    .isEmail()
    .withMessage("Invalid E-mail")
    .normalizeEmail()
    .custom(value => {
      const myDb = getdb();
      return myDb
        .collection("New-Users")
        .find({ email: value })
        .next()
        .then(result => {
          console.log("E-mail exist->:" + result);
          if (result) {
            return Promise.reject("E-mail already exist");
          }
        });
    }),
  body("password", "Invalid Password,Password must be alpha numeric")
    .trim()
    .not()
    .isEmpty()
    .isLength({ min: 6, max: 16 }),
  controller.registerUser
);
app.post(
  "/login",
  [
    body("email", "Invalid E-mail")
      .trim()
      .isEmail()
      .normalizeEmail(),
    body("password")
      .trim()
      .not()
      .isEmpty()
      .withMessage("Password Should not be empty")
      .isLength({ min: 6, max: 20 })
      .withMessage("Password Should be minimum 6 character")
  ],
  controller.getLogin
);

// app.use("/cart", cartRouter);

app.get("/", controller.getIndex);
app.use(controller.get404);

dbConnect(() => {
  // console.log("DB inside App.js");
});
app.listen(PORT, () => {
  console.log(`Listening on PORT:${PORT}`);
});
