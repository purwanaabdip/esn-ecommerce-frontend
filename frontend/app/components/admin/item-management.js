"use strict"

import React from "react"
import { connect } from "react-redux"

import ItemManagementForm from "./item-management-form"

import * as ItemActions from "../../actions/item-actions"

// Currency Formatter
import currencyFormatter from "currency-formatter"
const currencyFormat = {
  symbol: "Rp.",
  decimal: ",",
  thousand: ".",
  precision: 1,
  format: "%s %v" // %s is the symbol and %v is the value
}

// Connect to reducer
@connect((store) => {
	return {
		items: store.item_store.items,
		item: store.item_store.item,
		activity: store.item_store.activity,
		loading: store.item_store.loading,
		alert: store.item_store.alert,
		notification: store.item_store.notification
	}
})
export default class ItemManagement extends React.Component {
	componentWillMount() {
		this.getItems()
	}
	getItems() {
		this.props.dispatch(ItemActions.getItems())
	}
	prepInsertItem() {
		$(".ui.modal").modal("show")
		this.props.dispatch(ItemActions.prepInsertItem())
	}
	prepEditItem(item) {
		$(".ui.modal").modal("show")
		this.props.dispatch(ItemActions.prepEditItem(item))
	}
	prepDeleteItem(item) {
		$(".ui.modal").modal("show")
		this.props.dispatch(ItemActions.prepDeleteItem(item))
	}
  render() {
		const ItemComponents = this.props.items.map((item) => {
      return (
        <tr key={item._id} id={item._id}>
          <td><img className="ui image small" src={"../../themes/default/assets/images/" + item.data.itemImage}></img></td>
          <td>{item.data.itemId} - {item.data.itemName}</td>
          <td>{item.data.itemDescription}</td>
          <td>{currencyFormatter.format(item.data.itemPrice, {currencyFormat})}</td>
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
  	})
    return (
    	<div className="ui container">
        <table className="ui collapsing table" id="sticky-segment">
          <thead>
            <tr>
              <th>Image</th>
              <th>Item ID</th>
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
				{
					// Alert message
					this.props.notification !== "" ? (
						<div className="ui icon success message">
							{
								this.props.loading === true ? (
									<i class="notched circle loading icon"></i>
								) : ( "" )
							}
							<div className="content">
			          <div className="header">
			            {this.props.notification.type.charAt(0).toUpperCase() + this.props.notification.type.slice(1)}
			          </div>
								<p>{this.props.notification.message}</p>
							</div>
		        </div>
					) : (
						""
					)
				}
        <div className="fluid large ui button primary" data-position="top center" onClick={this.prepInsertItem.bind(this)}>Add new item</div>
        <div className="ui special popup">Create new item</div>
        <ItemManagementForm />
      </div>
    )
  }
}
