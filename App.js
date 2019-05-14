const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const PORT = process.env.PORT || 8080;

app.set("view engine", "ejs");
app.set("views", "views");

const signupRoute = require("./Route/signup");
const loginRoute = require("./Route/login");
const controller = require("./controller/user");
//const Data = signup.Data;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static("./public"));

app.use("/form/login", loginRoute);
app.use("/form/signup", signupRoute);
app.use("/signup", controller.registerUser);
app.use("/login", controller.getLogin);
app.get("/", controller.getIndex);
app.use(controller.get404);

app.listen(PORT, () => {
  console.log(`Listening on PORT:${PORT}`);
});
