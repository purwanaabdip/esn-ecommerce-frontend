const mongoose = require("mongoose");
const routes = require("express").Router();
const codeDictionary = require("../responseCodes.json");
const appVer = require("../app.json");
const Items = require("../models/items");

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
// Items routes (/items)
// ---------------------------------
routes.get("/", function(req, res) {
	Items.find({"meta.deletedBy": ""}, function(err, items) {
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

routes.get("/:itemId", function(req, res) {
	Items.findOne({_id: req.params.itemId}, function(err, items) {
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
	Items.findByIdAndUpdate(req.body._id, req.body, { new: true }, function(err, item) {
		if (err) {
			res.send(err);
		}
		else {
			response.data = item;
			response.notification = codeDictionary.MDB0003;
			res.send(response);
    }
  });
});

routes.post("/", function(req, res) {
	var newItem = {};
	newItem.meta = meta;
	newItem.data = req.body;
	Items.findOneAndUpdate({"data.itemId": req.body.itemId, "meta.deletedBy": ""}, newItem, {upsert: true, new: true, runValidators: true}, function(err, items) {
		if (err) {
			res.send(err);
		}
		else {
			response.data = items.ops;
			response.notification = codeDictionary.MDB0002;
			res.send(response);
		}
	});
});

module.exports = routes;
