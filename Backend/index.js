'use strict';
// Module Dependencies
var express = require('express');
// import routes from './routes';
// import user from './routes/user';
var http = require('http');
var path = require('path');
var fs = require('fs');
var mongoose = require('mongoose');
var ObjectId = mongoose.Types.ObjectId;
var bodyParser = require('body-parser');
var jsonParser = bodyParser.json();
var urlencodedParser = bodyParser.urlencoded({ extended: false })
var codeDictionary = require('./responseCodes.json');
var api = require('./app.json');
var app = express();

// Environment settings
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.json({ type: 'application/*+json' }));
// Development only
if ('development' == app.get('env')) {
	mongoose.connect('mongodb://localhost/ecommerce');
}

// Import all models
fs.readdirSync(__dirname + '/models').forEach(function(filename) {
	if(~filename.indexOf('.js')) require(__dirname + '/models/' + filename);
});

// Set metadata
var meta = {
	createdAt: new Date(),
	createdBy: '',
	updatedAt: new Date(),
	updatedBy: '',
	deletedAt: new Date(0),
	deletedBy: ''
};
var response = {};
response.api = api;

// ---------------------------------
// Users routes 
// ---------------------------------
var Users = mongoose.model('users');
app.get('/users', function(req, res) {
	Users.find(function(err, users) {
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

app.get('/users/:userId', function(req, res) {
	Users.find({_id: req.params.userId}, function(err, users) {
		Users.populate(users, {path: 'meta.createdBy meta.updatedBy meta.deletedBy', select: 'data'}, function(err, items) {
			if (err) res.send(err);
			else {
				res.send(users);
			}
		});
	});
});

app.put('/users', jsonParser, function(req, res) {
	var newUser = {};
	newUser.meta = meta;
	newUser.data = req.body;
	var params = { username: newUser.username};
	Users.db.collection('users').update(params, newUser, function(err, users) {
		if (err) {
			res.send(err);
		}
		else {
			response.data = users;
			response.notification = codeDictionary.MDB0003;
			res.send(response);
		}
	});
});

app.post('/users', jsonParser, function(req, res) {
	var newUser = {};
	newUser.meta = meta;
	newUser.data = req.body;
	Users.db.collection('users').insert(newUser, function(err, users) {
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

// ---------------------------------
// Items routes
// ---------------------------------
var Items = mongoose.model('items');
app.get('/items', function(req, res) {
	Items.find(function(err, items) {
		res.send(items);
	});
});

app.get('/items/:userId', function(req, res) {
	Items.where('meta.createdBy', req.params.userId).find(function(err, items) {
		Items.populate(items, {path: 'meta.createdBy meta.updatedBy meta.deletedBy', select: 'data'}, function(err, items) {
			if (err) res.send(err);
			else {
				res.send(items);
			}
		});
	});
});

app.put('/items', jsonParser, function(req, res) {
	var newItem = {};
	newItem.meta = meta;
	newItem.data = req.body.data;
	var params = { _id: ObjectId(req.body._id)};
	Users.db.collection('items').update(params, newItem, function(err, items) {
		if (err) {
			res.send(err);
		}
		else {
			response.data = items;
			response.notification = codeDictionary.MDB0003;
			res.send(response);
		}
	});
});

app.post('/items', jsonParser, function(req, res) {
	var newItem = {};
	newItem.meta = meta;
	newItem.data = req.body;
	Users.db.collection('items').insert(newItem, function(err, items) {
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

app.listen(3000, function() {
	console.log('Express server started on port 3000');
});