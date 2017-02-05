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

// Insert item preparation
export function prepInsertItem(item) {
	dispatcher.dispatch({type: 'prep_insert_item', data: item});
}

// Insert new item
export function insertItem(item) {
	dispatcher.dispatch({type: 'xhr_start'});
	axios.post(url, item).then(function(response){
		getItems();
	}).catch(function(error){
		console.log(error);
	});
}

// Edit item preparation
export function prepEditItem(item) {
	dispatcher.dispatch({type: 'prep_edit_item', data: item});
}

// Edit item
export function editItem(item) {
	dispatcher.dispatch({type: 'xhr_start'});
	axios.put(url, item).then(function(response){
		getItems();
	}).catch(function(error){
		console.log(error);
	});
}

// Delete item preparation
export function prepDeleteItem(item) {
	dispatcher.dispatch({type: 'prep_delete_item', data: item});
}

// Delete item
export function deleteItem(item) {
	dispatcher.dispatch({type: 'xhr_start'});
	item.meta.deletedAt = new Date();
	item.meta.deletedBy = "58834b9567c5f223888d2e5b";
	axios.put(url, item).then(function(response){
		getItems();
	}).catch(function(error){
		console.log(error);
	});
}
