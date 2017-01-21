// ================================
// Created by Eka Setya Nugraha.
// Copyright 1/21/2017.
// ================================
import { EventEmitter } from 'events';

class ItemStore extends EventEmitter {
	constructor() {
		super()
		this.items = [];
	}
	getAll(cb) {
		const url = 'http://localhost:3000/items';
	    let xhr = new XMLHttpRequest();
	    xhr.open('GET', url); // true for asynchronous
	    xhr.send();
	    xhr.onreadystatechange = function() {
	        if (xhr.readyState == 4 && xhr.status == 200) {
	        	let response = JSON.parse(xhr.responseText);
	            this.items = response.data;
			    cb(this.items);
	        }
	    }
	}
}

const itemStore = new ItemStore;

export default itemStore;