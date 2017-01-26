// ================================
// Created by Eka Setya Nugraha.
// Copyright 1/21/2017.
// ================================
import axios from 'axios';
import dispatcher from '../dispatcher';

// Get individual item
export function getItem(id) {
  dispatcher.dispatch({type: 'xhr_start'});
	const url = 'http://localhost:3000/item/' + id;
	axios.get(url).then(function(response){
		dispatcher.dispatch({type: 'get_item', data: response.data.data});
	}).catch(function(error){
		console.log(error);
	});
}
