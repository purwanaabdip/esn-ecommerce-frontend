"use strict";
// Module Dependencies
var express = require("express");
var passport = require("passport");
var localStrategy = require("passport-local").Strategy;
var path = require("path");
var fs = require("fs");
var mongoose = require("mongoose");
var bodyParser = require("body-parser");
var users = require("./routes/users");
var items = require("./routes/items");
var app = express();

// Development only
if ("development" == app.get("env")) {
	mongoose.connect("mongodb://localhost/ecommerce");
}

passport.use(new localStrategy(
  function(username, password, done) {
    User.findOne({ username: username }, function (err, user) {
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
app.use(function (req, res, next) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT");
  res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.setHeader("Access-Control-Allow-Credentials", true);
  next();
});

// Import all models
fs.readdirSync(__dirname + "/models").forEach(function(filename) {
	if(~filename.indexOf(".js")) require(__dirname + "/models/" + filename);
});

// Import all routes
app.use("/users", users);
app.use("/items", items);
// ----------------------

app.post("/login", passport.authenticate("local", { successRedirect: "/", failureRedirect: "/login", failureFlash: true }));

app.listen(3000, function() {
	console.log("Express server started on port 3000");
});
