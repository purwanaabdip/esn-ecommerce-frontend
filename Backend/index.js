"use strict";
// Module Dependencies
const express = require("express");
const passport = require("passport");
const localStrategy = require("passport-local").Strategy;
const path = require("path");
const fs = require("fs");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const app = express();

// Development only
if ("development" == app.get("env")) {
	mongoose.connect("mongodb://localhost/ecommerce");
}

passport.use(new localStrategy(
  (username, password, done) => {
    User.findOne({ username: username }, (err, user) => {
      if (err) {
        return done(err);
      }
      if (!user) {
        return done(null, false, { message: "Incorrect username." });
      }
      if (!user.validPassword(password)) {
        return done(null, false, { message: "Incorrect password." });
      }
      return done(null, user);
    });
  }
));

// Environment settings
app.set("port", process.env.PORT || 3000);
app.set("views", path.join(__dirname, "views"));
app.use(express.static(path.join(__dirname, "public")));
app.use(bodyParser.json());
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
const users = require("./routes/users");
const items = require("./routes/items");
app.use("/users", users);
app.use("/items", items);
// ----------------------

app.post("/login", passport.authenticate("local", { successRedirect: "/", failureRedirect: "/login", failureFlash: true }));

app.listen(3000, () => {
	console.log("Express server started on port 3000");
});
