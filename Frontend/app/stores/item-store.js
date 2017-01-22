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
		this.loading = false;
	}

	getItems() {
		return this.items;
	}

	getState() {
		return this.loading;
	}

	handleActions(action) {
		switch(action.type) {
			case 'xhr_start': {
				this.loading = true;
				this.emit('change_state');
			}
			case 'get_items': {
				this.items = action.data;
				this.loading = false;
				this.emit('change');
				this.emit('change_state');
			}
		}
	}
}

const itemStore = new ItemStore;
dispatcher.register(itemStore.handleActions.bind(itemStore));
window.dispatcher = dispatcher;

export default itemStore;