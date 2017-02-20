"use strict";
// Module Dependencies
var express = require("express");
var passport = require('passport');
var localStrategy = require('passport-local').Strategy;
var users = require("./routes/users");
var items = require("./routes/items");
var http = require("http");
var path = require("path");
var fs = require("fs");
var mongoose = require("mongoose");
var bodyParser = require("body-parser");
var urlencodedParser = bodyParser.urlencoded({ extended: false });
var app = express();

passport.use(new localStrategy(
  function(username, password, done) {
    User.findOne({ username: username }, function (err, user) {
      if (err) { return done(err); }
      if (!user) {
        return done(null, false, { message: 'Incorrect username.' });
      }
      if (!user.validPassword(password)) {
        return done(null, false, { message: 'Incorrect password.' });
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
// Add headers
app.use(function (req, res, next) {
    // Website you wish to allow to connect
    res.setHeader("Access-Control-Allow-Origin", "*");
    // Request methods you wish to allow
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT");
    // Request headers you wish to allow
    res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader("Access-Control-Allow-Credentials", true);
    // Pass to next layer of middleware
    next();
});
// Development only
if ("development" == app.get("env")) {
	mongoose.connect("mongodb://localhost/ecommerce");
}

// Import all models
fs.readdirSync(__dirname + "/models").forEach(function(filename) {
	if(~filename.indexOf(".js")) require(__dirname + "/models/" + filename);
});

app.use("/users", users);
app.use("/items", items);

// ---------------------------------
// Orders routes
// ---------------------------------
var Orders = mongoose.model("orders");
app.get("/orders", function(req, res) {
	Orders.find(function(err, items) {
		if (err) {
			res.send(err);
		}
		else {
			response.data = items;
			response.notification = codeDictionary.MDB0001;
			res.send(response);
		}
	});
});

app.listen(3000, function() {
	console.log("Express server started on port 3000");
});
