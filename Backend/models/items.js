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
		itemId: String,
		itemName: String,
		itemImage: String,
		itemPrice: Number,
		itemStock: Number,
		itemDescription: String
	}
});

mongoose.model('items', itemsSchema);
