// ================================
// Created by Eka Setya Nugraha.
// Copyright 26/01/2017.
// ================================
import React from 'react';

import Breadcrumb from '../breadcrumb';
import ItemManagementForm from './item-management-form';

import ItemStore from '../../stores/item-store';
import * as ItemActions from '../../actions/item-actions';

export default class ItemManagement extends React.Component {
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
    $('.ui.sticky').sticky({
      context: '#sticky-segment'
    });
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
      return (
        <tr key={item._id} id={item._id}>
          <td><img className="ui image small" src={"../../themes/default/assets/images/" + item.data.itemImage}></img></td>
          <td>{item.data.itemId}</td>
          <td>{item.data.itemName}</td>
          <td>{item.data.itemPrice}</td>
          <td>{item.data.itemStock}</td>
          <td>{item.data.itemDescription}</td>
        </tr>
      )
  	});
    return (
    	<div className="ui container">
        <div className="ui basic segment">
          <div className="left ui rail"></div>
          <div className="right ui rail">
            <div className="ui sticky">
              <div className="ui basic segment">
                <div className="ui button primary" id="add-new-item">Add new item</div>
              </div>
            </div>
          </div>
          <table className="ui fixed table" id="sticky-segment">
            <thead>
              <tr>
                <th>Image</th>
                <th>Item ID</th>
                <th>Name</th>
                <th>Price</th>
                <th>Stock</th>
                <th>Description</th>
              </tr>
            </thead>
            <tbody>
              {ItemComponents}
            </tbody>
          </table>
        </div>
        <ItemManagementForm button="#add-new-item"/>
      </div>
    )
  }
}
