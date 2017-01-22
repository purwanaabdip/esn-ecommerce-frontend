// ================================
// Created by Eka Setya Nugraha.
// Copyright 1/21/2017.
// ================================
import { EventEmitter } from 'events';
import dispatcher from '../dispatcher'

class ItemStore extends EventEmitter {
	constructor() {
		super()
		this.items = [];
	}

	createItem(item) {
		this.items.push({
			item
		});
		this.emit('change');
	}

	getAll() {
		return this.items;
	}

	handleActions(action) {
		switch(action.type) {
			case 'create_item': {
				this.createItem(action.text);
			}
			case 'get_items': {
				this.items = action.data;
				this.emit('change');
			}
		}
	}
}

const itemStore = new ItemStore;
dispatcher.register(itemStore.handleActions.bind(itemStore));
window.dispatcher = dispatcher;

export default itemStore;