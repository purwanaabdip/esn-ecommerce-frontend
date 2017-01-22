// ================================
// Created by ekasetya.
// Copyright 10/11/16.
// ================================
import React from 'react';

import Item from './item';
import Breadcrumb from './breadcrumb';

import ItemStore from '../stores/item-store'
import * as ItemActions from '../actions/item-actions'

export default class Home extends React.Component {
	constructor() {
		super();
		this.state = {
			items: ItemStore.getAll()
		};
	}
	componentWillMount() {
		ItemStore.on('change', () => {
			this.setState({
				items: ItemStore.getAll()
			});
			console.log(this.state);
		});
	}
	getItems() {
		ItemActions.getItems();
	}
    render() {
    	const { items } = this.state;
    	// console.log(this.state);

    	// const ItemComponents = items.map((item) => {
    	// 	return <h1>{item.data}</h1>
    	// });
        return (
        	<div className="ui container">
	        	<div className="ui top attached block header">
	        		<Breadcrumb title="Home" />
	        	</div>
	        	<div className="ui bottom attached segment">
		            <div className="ui special four stackable doubling cards">
		            	<button onClick={this.getItems.bind(this)}>Get all</button>
		            </div>
		        </div>
	        </div>
        )
    }
}