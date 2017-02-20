const mongoose = require("mongoose");
const routes = require("express").Router();
const codeDictionary = require("../responseCodes.json");
const appVer = require("../app.json");
const Users = require("../models/users");

// Set metadata
var meta = {
	createdAt: new Date(),
	createdBy: "",
	updatedAt: new Date(),
	updatedBy: "",
	deletedAt: new Date(0),
	deletedBy: ""
};
var response = {};
response.api = appVer;
// ---------------------------------
// Users routes (/users)
// ---------------------------------
routes.get("/", function(req, res) {
	Users.find({"meta.deletedBy": ""}, function(err, users) {
		if (err) {
			res.send(err);
		}
		else {
			response.data = users;
			response.notification = codeDictionary.MDB0001;
			res.send(response);
		}
	});
});

routes.get("/:userId", function(req, res) {
	Users.findOne({_id: req.params.userId}, function(err, users) {
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

routes.put("/", function(req, res) {
	Users.findByIdAndUpdate(req.body._id, req.body, { new: true }, function(err, user) {
		if (err) {
			res.send(err);
		}
		else {
			response.data = user;
			response.notification = codeDictionary.MDB0003;
			res.send(response);
		}
	});
});

routes.post("/", function(req, res) {
	var newUser = {};
	newUser.meta = meta;
	newUser.data = req.body;
	Users.findOneAndUpdate({"data.userId": req.body.userId, "meta.deletedBy": ""}, newUser, {upsert: true, new: true, runValidators: true}, function(err, users) {
		if (err) {
			res.send(err);
		}
		else {
			response.data = users.ops;
			response.notification = codeDictionary.MDB0002;
			res.send(response);
		}
	});
});

module.exports = routes;
