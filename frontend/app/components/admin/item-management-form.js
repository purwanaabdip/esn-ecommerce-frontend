"use strict"

import React from "react"
import { connect } from "react-redux"

import * as ItemActions from "../../actions/item-actions"

// Connect to reducer
@connect((store) => {
	return {
		item: store.item.item,
		activity: store.item.activity,
		loading: store.item.loading
	}
})
export default class ItemManagementForm extends React.Component {
	componentDidMount() {
		// Form validator initialization
		$(".ui.form").form({
			fields: {
				itemId : "empty",
				itemName : "empty",
				itemPrice : "empty",
				itemStock : "empty",
				itemImage : "empty",
				itemDescription : "empty",
			}
		})
	}
	componentWillUnmount() {
		// When leaving page, remove the modal from DOM to prevent duplicates
		$(".ui.dimmer.modals.page").remove()
	}
  submitForm() {
		const activity = this.props.activity
		// Check if all fields are valid
		if ($("#item-form").form("is valid")) {
			// Initialize item object to send
			let item = this.props.item
	    // Iterate each input, store value to body object
	    $("#item-form :input").map(function() {
	      let input = $(this)
				if (activity == "insert") {
		      item[input.attr("id")] = input.val()
				} else {
					item.data[input.attr("id")] = input.val()
				}
	    })
			switch (activity) {
				case "insert" : {
					this.props.dispatch(ItemActions.insertItem(item))
					break
				}
				case "edit" : {
					this.props.dispatch(ItemActions.editItem(item))
					break
				}
				case "delete" : {
					this.props.dispatch(ItemActions.deleteItem(item))
					break
				}
			}
		}
  }
	closeForm() {
		$(".ui.modal").modal("hide")
	}
	isDelete() {
		if (this.props.activity === "delete") {
			return " disabled"
		} else {
			return ""
		}
	}
	isLoading() {
		if (this.props.loading === true) {
			return " loading"
		} else {
			return ""
		}
	}
  render() {
		// Populate form values
		$("#item-form").form("set values", {
			itemId : this.props.item.data ? this.props.item.data.itemId : "",
			itemName : this.props.item.data ? this.props.item.data.itemName : "",
			itemPrice : this.props.item.data ? this.props.item.data.itemPrice : "",
			itemStock : this.props.item.data ? this.props.item.data.itemStock : "",
			itemImage : this.props.item.data ? this.props.item.data.itemImage : "",
			itemDescription : this.props.item.data ? this.props.item.data.itemDescription : ""
		})
		const submitForm = this.submitForm.bind(this)
		const item = this.props.item
		const activity = this.props.activity
		const modalTitle = (() => {
			if (activity) {
				switch (activity) {
					case "insert" : return "Add new item"
					case "edit"		: return "Edit item"
					case "delete" : return "Delete item"
				}
			}
		})()
		const itemImage = (() => {
			if (activity) {
				switch (activity) {
					case "insert" : return <img className="ui image medium" src="../../themes/default/assets/images/image-placeholder.png" />
					case "edit"		: return <img className="ui image medium" src={"../../themes/default/assets/images/" + item.data.itemImage} />
					case "delete" : return <img className="ui image medium" src={"../../themes/default/assets/images/" + item.data.itemImage} />
				}
			}
		})()
		const actionButton = (() => {
			if (activity) {
				switch (activity) {
					case "insert" : return <div className="ui green button" onClick={submitForm}>Create</div>
					case "edit"		: return <div className="ui blue button" onClick={submitForm}>Update</div>
					case "delete" : return <div className="ui red button" onClick={submitForm}>Delete</div>
				}
			}
		})()
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
            <form className={"ui form" + this.isLoading()} id="item-form">
              <div className={"two fields" + this.isDelete()}>
                <div className="required field">
                  <label>Item ID</label>
                  <input type="text" placeholder="Item ID" id="itemId"/>
                </div>
                <div className="required field">
                  <label>Item Name</label>
                  <input type="text" placeholder="Item Name" id="itemName"/>
                </div>
              </div>
              <div className={"three fields" + this.isDelete()}>
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
              <div className={"required field" + this.isDelete()}>
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
