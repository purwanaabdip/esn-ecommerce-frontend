// ================================
// Created by Eka Setya Nugraha.
// Copyright 10/11/2016.
// ================================
import React from 'react';

import Item from './item';
import Breadcrumb from './breadcrumb';
import Loader from './loader';

import ItemStore from '../stores/item-store'
import * as ItemActions from '../actions/item-actions'

export default class Home extends React.Component {
	constructor() {
		super();
		this.getItems = this.getItems.bind(this);
		this.refresh = this.refresh.bind(this);
		this.state = ItemStore.getState();
	}

	componentWillMount() {
		ItemStore.on('change', this.refresh);
		ItemActions.getItems();
	}

	componentDidMount() {
		$('#loader').hide();
	}

	componentWillUnmount() {
		ItemStore.removeListener('change', this.refresh);
	}

	refresh() {
		this.state = ItemStore.getState();
		this.setState(this.state);
		if (this.state.loading) {
			if ($('#loader').is(":visible") == false) {
				$('#loader').show();
			}
		}
		else {
			$('#loader').hide();
		}
	}

	getItems() {
		ItemActions.getItems();
	}

    render() {
    	// Iterate through all items to make Item components
    	const ItemComponents = this.state.items.map((item) => {
    		return <Item key={item._id} id={item._id} src={"../themes/default/assets/images/" + item.data.itemImage} name={item.data.itemName} price={item.data.itemPrice} description={item.data.itemDescription}/>
    	});
        return (
        	<div className="ui container">
	        	<div className="ui top attached block header">
	        		<Breadcrumb title="Home" />
	            	<button className="ui button" onClick={this.getItems.bind(this)}>Refresh</button>
	        	</div>
	        	<div className="ui bottom attached segment">
		            <div className="ui special four stackable doubling cards">
		            	<Loader />
		            	{ItemComponents}
		            </div>
		        </div>
	        </div>
        )
    }
}