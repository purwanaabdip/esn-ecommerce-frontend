// ================================
// Created by Eka Setya Nugraha.
// Copyright 01/02/2017.
// ================================
import React from 'react';

import * as ItemActions from '../../actions/item-actions';

export default class ItemManagementForm extends React.Component {
	constructor() {
		super();
		this.submitForm = this.submitForm.bind(this);
		this.closeForm = this.closeForm.bind(this);
	}
  componentDidMount() {
		// Attach modal
    $('.ui.modal').modal('attach events', this.props.button, 'show');
		// Form validator
		$('.ui.form').form({
	    fields: {
	      itemId : 'empty',
	      itemName : 'empty',
	      itemPrice : 'empty',
	      itemStock : 'empty',
	      itemImage : 'empty',
	      itemDescription : 'empty',
	    }
	  });
  }
	// Modal actions (show, submit, hide)
  submitForm() {
		if ($('#item-form').form('is valid')) {
	    // Initialize item object to send
	    let item = {
	      itemId: "",
	      itemName: "",
	      itemImage: "",
	      itemPrice: 0,
	      itemStock: 0,
	      itemDescription: ""
	    };
	    // Iterate each input, store value to body object
	    $(".form :input").each(function(){
	      let input = $(this);
	      item[input.attr("id")] = input.val();
	    });
	    ItemActions.insertItem(item);
			this.closeForm();
		}
  }
	closeForm() {
		$('.ui.modal').modal('hide');
	}
  render() {
    return (
      <div className="ui modal">
        <i className="close icon"></i>
        <div className="header">
          Add new item
        </div>
        <div className="image content">
          <div className="image">
            <img className="ui image medium" src={"../../themes/default/assets/images/ps4-1.jpg"}></img>
          </div>
          <div className="description">
            <form className="ui form" id="item-form">
              <div className="two fields">
                <div className="required field">
                  <label>Item ID</label>
                  <input type="text" placeholder="Item ID" id="itemId"/>
                </div>
                <div className="required field">
                  <label>Item Name</label>
                  <input type="text" placeholder="Item Name" id="itemName"/>
                </div>
              </div>
              <div className="three fields">
                <div className="required field">
                  <label>Price</label>
                  <input type="number" placeholder="Price" id="itemPrice"/>
                </div>
                <div className="required field">
                  <label>Stock</label>
                  <input type="number" placeholder="Stock" id="itemStock"/>
                </div>
                <div className="required field">
                  <label>Image</label>
                  <input type="text" placeholder="Image" id="itemImage"/>
                </div>
              </div>
              <div className="required field">
                <label>Description</label>
                <textarea placeholder="Description" id="itemDescription"/>
              </div>
		          <div className="ui cancel button" onClick={this.closeForm.bind(this)}>Cancel</div>
		          <div className="ui green submit button" onClick={this.submitForm.bind(this)}>Create</div>
            </form>
          </div>
        </div>
      </div>
    )
  }
}
