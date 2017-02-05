// ================================
// Created by Eka Setya Nugraha.
// Copyright 01/02/2017.
// ================================
import React from "react";

import ItemStore from '../../stores/item-store';
import * as ItemActions from "../../actions/item-actions";

export default class ItemManagementForm extends React.Component {
	constructor() {
		super();
		this.submitForm = this.submitForm.bind(this);
		this.closeForm = this.closeForm.bind(this);
		this.refresh = this.refresh.bind(this);
		this.state = ItemStore.getState();
	}
	componentWillMount() {
		ItemStore.on('change_item', this.refresh);
	}
  componentDidMount() {
		// Form validator
		$(".ui.form").form({
	    fields: {
	      itemId : "empty",
	      itemName : "empty",
	      itemPrice : "empty",
	      itemStock : "empty",
	      itemImage : "empty",
	      itemDescription : "empty",
	    }
	  });
  }
	componentWillUnmount() {
		// When leaving page, remove the modal from DOM to prevent duplicates
		$(".ui.dimmer.modals.page").remove();
	}
	refresh() {
		this.state = ItemStore.getState();
		this.setState(this.state);
		if (this.state.item._id) {
			$("#item-form").form("set values", {
				itemId : this.state.item.data.itemId,
				itemName : this.state.item.data.itemName,
				itemPrice : this.state.item.data.itemPrice,
				itemStock : this.state.item.data.itemStock,
				itemImage : this.state.item.data.itemImage,
				itemDescription : this.state.item.data.itemDescription
			});
		}
		else {
			$("#item-form").form("set values", {
				itemId : "",
				itemName : "",
				itemPrice : "",
				itemStock : "",
				itemImage : "",
				itemDescription : ""
			});
		}
		$(".ui.modal").modal("show");
	}
	// Modal actions (show, submit, hide)
  submitForm() {
		const activity = this.state.activity;
		// Check if all fields are valid
		if ($("#item-form").form("is valid")) {
			// Initialize item object to send
			let item = this.state.item;
	    // Iterate each input, store value to body object
	    $(".form :input").each(function(){
	      let input = $(this);
				if (activity == "insert") {
		      item[input.attr("id")] = input.val();
				} else {
					item.data[input.attr("id")] = input.val();
				}
	    });
			switch (activity) {
				case "insert" : {
					ItemActions.insertItem(item);
					break;
				}
				case "edit" : {
					ItemActions.editItem(item);
					break;
				}
				case "delete" : {
					ItemActions.deleteItem(item);
					break;
				}
			}
			this.closeForm();
		}
  }
	closeForm() {
		$(".ui.modal").modal("hide");
		$("#item-form").form("set values", {
			itemId : "",
			itemName : "",
			itemPrice : "",
			itemStock : "",
			itemImage : "",
			itemDescription : ""
		});
	}
	insertItem(item) {
		ItemActions.insertItem(item);
	}
	editItem(item) {
		ItemActions.editItem(item);
	}
	deleteItem(item) {
		ItemActions.deleteItem(item);
	}
  render() {
		const context = this;
		const item = this.state.item;
		const activity = this.state.activity;
		const modalTitle = (function() {
			if (activity) {
				switch (activity) {
					case "insert" : return "Add new item";
					case "edit"		: return "Edit item";
					case "delete" : return "Delete item";
				}
			}
		})();
		const itemImage = (function() {
			if (activity) {
				switch (activity) {
					case "insert" : return <img className="ui image medium" src="../../themes/default/assets/images/image-placeholder.png" />;
					case "edit"		: return <img className="ui image medium" src={"../../themes/default/assets/images/" + item.data.itemImage} />;
					case "delete" : return <img className="ui image medium" src={"../../themes/default/assets/images/" + item.data.itemImage} />;
				}
			}
		})();
		const actionButton = (function() {
			if (activity) {
				switch (activity) {
					case "insert" : return <div className="ui green button" onClick={context.submitForm}>Create</div>;
					case "edit"		: return <div className="ui blue button" onClick={context.submitForm}>Update</div>;;
					case "delete" : return <div className="ui red button" onClick={context.submitForm}>Delete</div>;;
				}
			}
		})();
    return (
      <div className="ui modal">
        <i className="close icon"></i>
        <div className="header">
          {modalTitle}
        </div>
        <div className="image content">
          <div className="image">
            {itemImage}
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
		          <div className="ui cancel button" onClick={this.closeForm}>Cancel</div>
		          {actionButton}
            </form>
          </div>
        </div>
      </div>
    )
  }
}
