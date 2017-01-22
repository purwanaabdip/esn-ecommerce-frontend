// ================================
// Created by Eka Setya Nugraha.
// Copyright 01/21/2017.
// ================================
import { EventEmitter } from 'events';
import dispatcher from '../dispatcher'

class ItemStore extends EventEmitter {
	constructor() {
		super()
		this.state = {
			items: [],
			loading: false
		}
	}

	getState() {
		// console.log('STORE STATE',this.state.loading);
		return this.state;
	}

	handleActions(action) {
		switch(action.type) {
			case 'xhr_start': {
				this.state.loading = true;
				this.emit('change');
				break;
			}
			case 'get_items': {
				this.state.items = action.data;
				this.state.loading = false;
				this.emit('change');
				break;
			}
		}
	}
}

const itemStore = new ItemStore;
dispatcher.register(itemStore.handleActions.bind(itemStore));
window.dispatcher = dispatcher;

export default itemStore;