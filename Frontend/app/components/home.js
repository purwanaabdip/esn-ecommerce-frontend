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
		this.getItems = this.getItems.bind(this);
		this.refresh = this.refresh.bind(this);
		this.state = {
			items: ItemStore.getItems(),
			loading: ItemStore.getState()
		};
	}

	componentWillMount() {
		ItemStore.on('change', this.refresh);
	}

	componentDidMount() {
		this.getItems();
	}

	componentWillUnmount() {
		ItemStore.unbindListener('change', this.refresh);
	}

	refresh() {
		this.setState({
			items: ItemStore.getItems(),
			loading: ItemStore.getState()
		});
	}

	getItems() {
		ItemActions.getItems();
	}

    render() {
    	// Iterate through all items to make Item components
    	const ItemComponents = this.state.items.map((item) => {
    		return <Item key={item._id} id={item._id} src={"../themes/default/assets/images/" + item.data.itemImage} name={item.data.itemName} price={item.data.itemPrice} description={item.data.itemDescription}/>
    	});
    	// const Loader = <div className="ui active dimmer"><div className="ui indeterminate text loader">Preparing Files</div></div>
        return (
        	<div className="ui container">
	        	<div className="ui top attached block header">
	        		<Breadcrumb title="Home" />
	            	<button className="ui right" onClick={this.getItems.bind(this)}>Get all</button>
	        	</div>
	        	<div className="ui bottom attached segment">
		            <div className="ui special four stackable doubling cards">
		            	{ItemComponents}
		            </div>
		        </div>
	        </div>
        )
    }
}