"use strict"
// Module Dependencies
const router = require("express").Router()
const codeDictionary = require("../responseCodes.json")
const appVer = require("../app.json")
const User = require("../models/user")

// Set metadata
let meta = {
	createdAt: new Date(),
	createdBy: "",
	updatedAt: new Date(),
	updatedBy: "",
	deletedAt: "",
	deletedBy: ""
}
let response = {}
response.api = appVer
// ---------------------------------
// User routes (/user)
// ---------------------------------
router.get("/", (req, res) => {
	User.find({"meta.deletedBy": ""}, (err, users) => {
		if (err) {
			res.send(err)
		}
		else {
			response.data = users
			response.notification = codeDictionary.MDB0001
			res.send(response)
		}
	})
})

router.get("/:userId", (req, res) => {
	User.findOne({_id: req.params.userId}, (err, user) => {
		if (err) {
			res.send(err)
		}
		else {
			response.data = items
			response.notification = codeDictionary.MDB0001
			res.send(response)
		}
	})
})

router.put("/", (req, res) => {
	User.findByIdAndUpdate(req.body._id, req.body, { new: true }, (err, user) => {
		if (err) {
			res.send(err)
		}
		else {
			response.data = user
			response.notification = codeDictionary.MDB0003
			res.send(response)
		}
	})
})

router.post("/", (req, res) => {
	let newUser = {}
	newUser.meta = meta
	newUser.data = req.body
	User.findOneAndUpdate({"data.userId": req.body.userId, "meta.deletedBy": ""}, newUser, {upsert: true, new: true, runValidators: true}, (err, user) => {
		if (err) {
			res.send(err)
		}
		else {
			response.data = user.ops
			response.notification = codeDictionary.MDB0002
			res.send(response)
		}
	})
})

module.exports = router
