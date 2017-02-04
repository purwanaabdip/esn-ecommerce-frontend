// ================================
// Created by Eka Setya Nugraha.
// Copyright 26/01/2017.
// ================================
import React from 'react';

import Breadcrumb from '../breadcrumb';
import Loader from '../loader';
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
    $('#add-new-item').popup({
      popup: '.special.popup'
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
	deleteItem(item) {
		ItemActions.deleteItem(item);
	}
  render() {
		// Iterate through all items to make Item components
		const ItemComponents = this.state.items.map((item) => {
      return (
        <tr key={item._id} id={item._id}>
          <td><img className="ui image small" src={"../../themes/default/assets/images/" + item.data.itemImage}></img></td>
          <td>{item.data.itemId}</td>
          <td>{item.data.itemName}</td>
          <td>{item.data.itemDescription}</td>
          <td>{item.data.itemPrice}</td>
          <td>{item.data.itemStock}</td>
          <td>
            <button className="circular ui icon blue button" title="Edit">
              <i className="icon edit"></i>
            </button>
            <button className="circular ui icon red button" title="Delete" onClick={this.deleteItem.bind(this, item)}>
              <i className="icon trash"></i>
            </button>
            <div className="ui special popup">Create new item</div>
          </td>
        </tr>
      )
  	});
    return (
    	<div className="ui container">
        <table className="ui fixed table" id="sticky-segment">
          <thead>
            <tr>
              <th>Image</th>
              <th>Item ID</th>
              <th>Name</th>
              <th>Description</th>
              <th>Price</th>
              <th>Stock</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {ItemComponents}
          </tbody>
        </table>
        <div className="fluid large ui button primary" id="add-new-item" data-position="top center">Add new item</div>
        <div className="ui special popup">Create new item</div>
        <ItemManagementForm button="#add-new-item"/>
      </div>
    )
  }
}
