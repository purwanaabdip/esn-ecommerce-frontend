// ================================
// Created by Eka Setya Nugraha.
// Copyright 1/21/2017.
// ================================
import dispatcher from '../dispatcher'

export function getItem(id) {
    dispatcher.dispatch({type: 'xhr_start'});
	const url = 'http://localhost:3000/item/' + id;
	var response = {};
    let xhr = new XMLHttpRequest();
    xhr.open('GET', url, true); // true for asynchronous
    xhr.send();
    xhr.onreadystatechange = function() {
        if (xhr.readyState == 4 && xhr.status == 200) {
        	let result = JSON.parse(xhr.responseText);
		    response = result.data;
        }
    }
    xhr.onload = function() {
		dispatcher.dispatch({type: 'get_item', data: response});
    }
}