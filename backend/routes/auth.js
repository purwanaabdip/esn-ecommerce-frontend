"use strict";
// Module Dependencies
const router = require("express").Router();
const passport = require("passport");
const codeDictionary = require("../responseCodes.json");
const appVer = require("../app.json");
const User = require("../models/user");

// Set metadata
let meta = {
	createdAt: new Date(),
	createdBy: "",
	updatedAt: new Date(),
	updatedBy: "",
	deletedAt: "",
	deletedBy: ""
};
let response = {};
response.api = appVer;
// ---------------------------------
// Auth routes (/auth)
// ---------------------------------
router.post("/register", (req, res) => {
	User.register(new User({ username: req.body.username }), req.body.password, (err) => {
	  if (err) {
			response.notification = err;
			response.notification.type = "error";
	    res.send(response);
	  }
	  else {
	    response.notification = codeDictionary.ACC0001;
	    res.send(response);
	  }
	});
});

router.post("/login", passport.authenticate("local"), (req, res, next) => {
	next();
});

router.post("/login", (req, res) => {
	response.data = req.user;
	response.notification = codeDictionary.ACC0002;
  res.send(response);
});

router.all("/logout", (req, res) => {
  req.logout();
});

module.exports = router;
