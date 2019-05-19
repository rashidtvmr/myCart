const dbConnect = require("./data/User").dbConnect;
const express = require("express");
const bodyParser = require("body-parser");

const app = express();
const session = require("express-session");
const MongodbSession = require("connect-mongodb-session")(session);

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

const formRoute = require("./Route/form");
const adminRoute = require("./Route/admin");
const userRoute = require("./Route/user");
// const cartRouter = require("./Route/cart.js");
const controller = require("./controller/user");
//const Data = signup.Data;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static("./public"));

///form/getprod/:prodId
app.use("/form", formRoute);
app.use("/user", userRoute);
app.use("/admin", adminRoute);

//post /admin/addproduct
// app.use("/form/addproduct", controller.getAddProduct);

// app.use("/cart", cartRouter);

app.get("/", controller.getIndex);
app.use(controller.get404);

dbConnect(() => {
  // console.log("DB inside App.js");
});
app.listen(PORT, () => {
  console.log(`Listening on PORT:${PORT}`);
});
