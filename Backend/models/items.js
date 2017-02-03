var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var itemsSchema = new Schema({
	meta: {
		createdAt: Date,
		createdBy: {
			type: String,
			ref: 'users'
		},
		updatedAt: Date,
		updatedBy: {
			type: String,
			ref: 'users'
		},
		deletedAt: Date,
		deletedBy: {
			type: String,
			ref: 'users'
		}
	},
	data: {
		itemName: String
	}
});

mongoose.model('items', itemsSchema);
