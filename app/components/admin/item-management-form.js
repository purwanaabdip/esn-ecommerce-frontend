"use strict"

import React from "react"
import { connect } from "react-redux"
import Dropzone from "react-dropzone"

import * as ItemActions from "../../actions/item-actions"

// Connect to reducer
@connect((store) => {
	return {
		item: store.item_store.item,
		activity: store.item_store.activity,
		loading: store.item_store.loading,
		file: store.item_store.file,
		file_loading: store.item_store.file_loading
	}
})
export default class ItemManagementForm extends React.Component {
	componentDidMount() {
		$(".ui.fluid.dropdown").dropdown()
		// Form validator initialization
		$("#item-form").form({
			fields: {
				itemId : "empty",
				itemName : "empty",
				itemPrice : "empty",
				itemStock : "empty",
				itemImage : "empty",
				itemDescription : "empty",
				itemCategory : "empty",
				itemGenre : "empty"
			}
		})
	}
	componentWillUnmount() {
		// When leaving page, remove the modal from DOM to prevent duplicates
		$(".ui.dimmer.modals.page").remove()
	}
	formIsValid() {
		if (this.props.activity === "delete") {
			return true
		} else {
			return $("#item-form").form("is valid")
		}
	}
  submitForm() {
		if (this.formIsValid()) {
			// Initialize item object to send
			let item = this.props.item
			// Iterate each input, store value to body object
			$("#item-form *").filter(":input").each((index, elem) => {
				let input = $(elem)
				if (this.props.activity == "insert") {
					item[input.attr("id")] = input.val()
				} else {
					item.data[input.attr("id")] = input.val()
				}
			})
			switch (this.props.activity) {
				case "insert" : {
					this.props.dispatch(ItemActions.insertItem(item))
					this.closeForm()
					break
				}
				case "edit" : {
					this.props.dispatch(ItemActions.editItem(item))
					this.closeForm()
					break
				}
				case "delete" : {
					this.props.dispatch(ItemActions.deleteItem(item))
					this.closeForm()
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
	onDrop(acceptedFile) {
		$("img.ui.image.medium").attr("src", acceptedFile[0].preview)
		this.props.dispatch(ItemActions.uploadImage(acceptedFile[0]))
	}
  render() {
		$("#item-form").form("clear")
		if (this.props.item.data !== undefined) {
			// Populate form values
			$("#item-form").form("set values", {
				itemId : this.props.item.data.itemId,
				itemName : this.props.item.data.itemName,
				itemPrice : this.props.item.data.itemPrice,
				itemStock : this.props.item.data.itemStock,
				itemImage : this.props.item.data.itemImage,
				itemDescription : this.props.item.data.itemDescription,
				itemCategory : this.props.item.data.itemCategory,
				itemGenre : this.props.item.data.itemGenre
			})
		} else {
			if (this.props.file) {
				$("#item-form").form("set values", {
					itemImage : this.props.file.filename
				})
			}
		}

		const modalTitle = (() => {
			switch (this.props.activity) {
				case "insert" : return "Add new item"
				case "edit"		: return "Edit item"
				case "delete" : return "Delete item"
			}
		})()
		const itemImage = (() => {
			switch (this.props.activity) {
				case "insert" : return <img className="ui image medium" src="../../themes/default/assets/images/image-placeholder.png" />
				case "edit"		: return <img className="ui image medium" src={"../../uploads/" + this.props.item.data.itemImage} />
				case "delete" : return <img className="ui image medium" src={"../../uploads/" + this.props.item.data.itemImage} />
			}
		})()
		const actionButton = (() => {
			switch (this.props.activity) {
				case "insert" : return <div className="ui right floted green button" onClick={this.submitForm.bind(this)}>Create</div>
				case "edit"		: return <div className="ui right floted blue button" onClick={this.submitForm.bind(this)}>Update</div>
				case "delete" : return <div className="ui right floted red button" onClick={this.submitForm.bind(this)}>Delete</div>
			}
		})()
    return (
      <div className="ui modal">
        <i className="close icon"></i>
        <div className="header">
          {modalTitle}
        </div>
        <div className="image content">
					<Dropzone multiple={false} accept="image/*" onDrop={this.onDrop.bind(this)} className="ui image" disableClick={this.props.activity === "delete" ? true : false}>
						{itemImage}
          </Dropzone>
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
							<div className={"two fields" + this.isDelete()}>
                <div className="required field">
                  <label>Category</label>
                  <select className="ui fluid dropdown" id="itemCategory">
										<option value="">Category</option>
										<option value="playstation 4">Playstation 4</option>
										<option value="playstation 3">Playstation 3</option>
										<option value="nintendo 3ds">Nintendo 3DS</option>
										<option value="xbox one">XBOX One</option>
										<option value="xbox 360">XBOX 360</option>
									</select>
                </div>
                <div className="required field">
                  <label>Genre</label>
                  <select className="ui fluid dropdown" id="itemGenre">
										<option value="">Genre</option>
										<option value="adventure">Adventure</option>
										<option value="action">Action</option>
										<option value="casual">Casual</option>
										<option value="racing">Racing</option>
										<option value="rpg">RPG</option>
										<option value="fps">First Person Shooter</option>
									</select>
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
                  <input type="text" placeholder="Image" id="itemImage" disabled/>
                </div>
              </div>
              <div className={"required field" + this.isDelete()}>
                <label>Description</label>
                <textarea placeholder="Description" id="itemDescription"/>
              </div>
            </form>
          </div>
        </div>
				<div className="actions">
					<div className="ui cancel button" onClick={this.closeForm}>Cancel</div>
					{actionButton}
				</div>
      </div>
    )
  }
}
