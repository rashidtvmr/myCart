const dbConnect = require("./data/User").dbConnect;
const express = require("express");
const bodyParser = require("body-parser");
const app = express();

const PORT = process.env.PORT || 8080;

app.set("view engine", "ejs");
app.set("views", "views");

const userRoute = require("./Route/user");
const adminRoute = require("./Route/admin");
// const cartRouter = require("./Route/cart.js");
const controller = require("./controller/user");
//const Data = signup.Data;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static("./public"));

app.use("/admin", adminRoute);

app.use("/form", userRoute);
//post /admin/addproduct
// app.use("/form/addproduct", controller.getAddProduct);
app.use("/signup", controller.registerUser);
app.post("/login", controller.getLogin);

// app.use("/cart", cartRouter);

app.get("/", controller.getIndex);
app.use(controller.get404);

dbConnect(() => {
  // console.log("DB inside App.js");
});
app.listen(PORT, () => {
  console.log(`Listening on PORT:${PORT}`);
});
