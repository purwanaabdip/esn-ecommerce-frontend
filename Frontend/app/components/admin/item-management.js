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
    $('.message .close').on('click', function() {
      $(this).closest('.message').transition('fade');
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
	prepInsertItem() {
		ItemActions.prepInsertItem();
	}
	prepEditItem(item) {
		ItemActions.prepEditItem(item);
	}
	prepDeleteItem(item) {
		ItemActions.prepDeleteItem(item);
	}
  render() {
    const state = this.state;
    const message = (function() {
      if (state.alert) {
        return (
          <div className="ui success message">
            <i className="close icon"></i>
            <div className="header">
              {state.alert}
            </div>
          </div>
        )
      }
    })();
		// Iterate through all items to make Item components
		const ItemComponents = this.state.items.map((item) => {
      return (
        <tr key={item._id} id={item._id}>
          <td><img className="ui image small" src={"../../themes/default/assets/images/" + item.data.itemImage}></img></td>
          <td>{item.data.itemId} - {item.data.itemName}</td>
          <td></td>
          <td>{item.data.itemDescription}</td>
          <td>{item.data.itemPrice}</td>
          <td>{item.data.itemStock}</td>
          <td>
            <button className="circular ui icon blue button" title="Edit" onClick={this.prepEditItem.bind(this, item)}>
              <i className="icon edit"></i>
            </button>
            <button className="circular ui icon red button" title="Delete" onClick={this.prepDeleteItem.bind(this, item)}>
              <i className="icon trash"></i>
            </button>
          </td>
        </tr>
      )
  	});
    return (
    	<div className="ui container">
        <table className="ui collapsing table" id="sticky-segment">
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
        {message}
        <div className="fluid large ui button primary" data-position="top center" onClick={this.prepInsertItem.bind(this)}>Add new item</div>
        <div className="ui special popup">Create new item</div>
        <ItemManagementForm />
      </div>
    )
  }
}
