const mongoose = require("mongoose")
const Schema = mongoose.Schema
const passportLocalMongoose = require("passport-local-mongoose")

const User = new Schema({
	meta: {
		createdAt: Date,
		createdBy: {
			type: String,
			ref: "users"
		},
		updatedAt: Date,
		updatedBy: {
			type: String,
			ref: "users"
		},
		deletedAt: Date,
		deletedBy: {
			type: String,
			ref: "users"
		}
	},
	data: {
		username: String,
		password: String
	}
})

User.plugin(passportLocalMongoose)

module.exports = mongoose.model("User", User)
