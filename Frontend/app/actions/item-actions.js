// ================================
// Created by Eka Setya Nugraha.
// Copyright 01/21/2017.
// ================================
import axios from 'axios';
import dispatcher from '../dispatcher';

const url = 'http://localhost:3000/items';

// Get all items
export function getItems() {
	dispatcher.dispatch({type: 'xhr_start'});
	axios.get(url).then(function(response){
		dispatcher.dispatch({type: 'get_items', data: response.data.data});
	}).catch(function(error){
		console.log(error);
	});
}

// Insert new item
export function insertItem(item) {
	dispatcher.dispatch({type: 'xhr_start'});
	axios.post(url, item).then(function(response){
		dispatcher.dispatch({type: 'insert_item', data: response.data.data});
	}).catch(function(error){
		console.log(error);
	});
}

// Delete item
export function deleteItem(item) {
	dispatcher.dispatch({type: 'xhr_start'});
	item.meta.deletedAt = new Date();
	item.meta.deletedBy = "58834b9567c5f223888d2e5b";
	axios.put(url, item).then(function(response){
		dispatcher.dispatch({type: 'delete_item', data: response.data.data});
		getItems();
	}).catch(function(error){
		console.log(error);
	});
}
