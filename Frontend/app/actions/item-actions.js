// ================================
// Created by Eka Setya Nugraha.
// Copyright 01/21/2017.
// ================================
import axios from 'axios';
import dispatcher from '../dispatcher';

// Get all items
export function getItems() {
	dispatcher.dispatch({type: 'xhr_start'});
	const url = 'http://localhost:3000/items';
	axios.get(url).then(function(response){
		dispatcher.dispatch({type: 'get_items', data: response.data.data});
	}).catch(function(error){
		console.log(error);
	});
}
