if(process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

const express = require("express");
const ejs = require("ejs");
const bodyParser = require("body-parser");
const _ = require("lodash");
const mongoose = require("mongoose");
const session = require("express-session");

const index = require("./routes/index");
const user = require("./routes/user");
const admin = require("./routes/admin");

const app = express();

app.set("view engine", "ejs");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

app.use("/", index);
app.use("/user", user);
app.use("/admin", admin);

mongoose.connect("mongodb://localhost:27017/medicoDB", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true
});
const db = mongoose.connection;
db.on("error", function(err) { console.error(err) });
db.once("open", function() { console.log("Connected to Mongoose") });












// Listen

app.listen(process.env.PORT || 3000, function() {
  console.log("Server running on poet 3000");
});
