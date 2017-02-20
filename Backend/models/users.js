var mongoose = require("mongoose");
var bcrypt   = require("bcrypt-nodejs");
var Schema = mongoose.Schema;

var usersSchema = new Schema({
	meta: {
		createdAt: Date,
		createdBy: {
			type: Schema.ObjectId,
			ref: "users"
		},
		updatedAt: Date,
		updatedBy: {
			type: Schema.ObjectId,
			ref: "users"
		},
		deletedAt: Date,
		deletedBy: {
			type: Schema.ObjectId,
			ref: "users"
		}
	},
	data: {
		username: String,
		password: String,
    facebook : {
      id : String,
      token : String,
      email : String,
      name : String
    }
	}
});

// Generate Hash
usersSchema.methods.generateHash = function(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

// Check if password is valid
usersSchema.methods.validPassword = function(password) {
    return bcrypt.compareSync(password, this.data.password);
};

module.exports = mongoose.model("users", usersSchema);
