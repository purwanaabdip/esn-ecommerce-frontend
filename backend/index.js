"use strict";
// ------------------------------------------------------
// Module Dependencies
// ------------------------------------------------------
const express = require("express");
const morgan = require("morgan");
const session = require("express-session");
const passport = require("passport");
const localStrategy = require("passport-local").Strategy;
const path = require("path");
const fs = require("fs");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");

// ------------------------------------------------------
// Express instantiation
const app = express();
// Database connection
mongoose.connect("mongodb://localhost/ecommerce", (err, res) => {
	if (err) console.log("Error connecting to database");
	else console.log("Database connection successful");
});
// ------------------------------------------------------

// ------------------------------------------------------
// Environment settings
// ------------------------------------------------------
app.use(morgan("dev"));
app.set("port", process.env.PORT || 3000);
app.use(express.static(path.join(__dirname, "public")));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(session({
	secret: "learn node",
	resave: "true",
	saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
let User = require("./models/user");
passport.use(User.createStrategy());
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT");
  res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.setHeader("Access-Control-Allow-Credentials", true);
  next();
});
// Import all models
fs.readdirSync(__dirname + "/models").forEach((filename) => {
	if(~filename.indexOf(".js")) require(__dirname + "/models/" + filename);
});
// Import all routes
const auth = require("./routes/auth");
const user = require("./routes/user");
const item = require("./routes/item");
app.use("/auth", auth);
app.use("/user", user);
app.use("/item", item);
// ------------------------------------------------------

app.listen(3000, () => {
	console.log("Express server started on port 3000");
});
