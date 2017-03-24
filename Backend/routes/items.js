"use strict";
// Module Dependencies
const mongoose = require("mongoose");
const routes = require("express").Router();
const codeDictionary = require("../responseCodes.json");
const appVer = require("../app.json");
const Items = require("../models/items");

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
// Items routes (/items)
// ---------------------------------
routes.get("/", (req, res) => {
	Items.find({"meta.deletedBy": ""}, (err, items) => {
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

routes.get("/:itemId", (req, res) => {
	Items.findOne({_id: req.params.itemId}, (err, items) => {
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

routes.put("/", (req, res) => {
	Items.findByIdAndUpdate(req.body._id, req.body, { new: true }, (err, item) => {
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

routes.post("/", (req, res) => {
	let newItem = {};
	newItem.meta = meta;
	newItem.data = req.body;
	Items.findOneAndUpdate({"data.itemId": req.body.itemId, "meta.deletedBy": ""}, newItem, {upsert: true, new: true, runValidators: true}, (err, items) => {
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
