// ================================
// Created by Eka Setya Nugraha.
// Copyright 1/22/2017.
// ================================
import { EventEmitter } from 'events';
import dispatcher from '../dispatcher';

class ItemDetailStore extends EventEmitter {
	constructor() {
		super()
		this.state = {
			item: {},
			loading: false
		};
	}

	getState() {
		return this.state;
	}

	handleActions(action) {
		switch(action.type) {
			case 'xhr_start': {
				this.state.loading = true;
				this.emit('change');
				break;
			}
			case 'get_item': {
				this.state.item = action.data;
				this.state.loading = false;
				this.emit('change');
				break;
			}
		}
	}
}

const itemDetailStore = new ItemDetailStore;
dispatcher.register(itemDetailStore.handleActions.bind(itemDetailStore));
window.dispatcher = dispatcher;

export default itemDetailStore;