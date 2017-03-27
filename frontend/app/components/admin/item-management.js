"use strict"

import React from "react"
import { Link } from "react-router"
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
	getItems(searchTerm = "") {
		this.props.dispatch(ItemActions.getItems(searchTerm))
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
  searchItems(event) {
    this.getItems(event.target.value)
  }
  xhrStatus() {
    return this.props.notification.type ? this.props.notification.type : ""
  }
  loadingIndicator() {
    if (this.props.loading === true) {
      return "loading"
    }
  }
  render() {
		const ItemComponents = this.props.items.map((item) => {
      return (
        <div key={item._id} id={item._id} className="item">
          <Link to={"/item/" + item._id} className="ui small image">
            <img src={"../../uploads/" + item.data.itemImage}></img>
          </Link>
          <div className="content">
            <Link to={"/item/" + item._id} className="header">{item.data.itemId + " " +  item.data.itemName}</Link>
            <div className="meta">
              <span className="price">{currencyFormatter.format(item.data.itemPrice, currencyFormat)}</span>
              <span className="stock">Stock : {item.data.itemStock}</span>
            </div>
            <div style={{textAlign: "justify"}} className="description">{item.data.itemDescription}</div>
            <div className="extra">
              <button className="circular ui icon right floated red button" title="Delete" onClick={this.prepDeleteItem.bind(this, item)}>
                <i className="icon trash"></i>
                Delete
              </button>
              <button className="circular ui icon right floated blue button" title="Edit" onClick={this.prepEditItem.bind(this, item)}>
                <i className="icon edit"></i>
                Edit
              </button>
            </div>
          </div>
        </div>
      )
  	})
    return (
    	<div className="ui container">
        <div className={"ui fluid left icon input " + this.loadingIndicator()}>
          <i className="search icon"></i>
          <input type="text" placeholder="Search..." onChange={this.searchItems.bind(this)}/>
        </div>
        <div className="ui relaxed divided items">
          {ItemComponents}
        </div>
				{
					// Alert message
					this.props.notification !== "" ? (
						<div className={"ui icon message " + this.xhrStatus()}>
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
