"use strict"

import React from "react"
import { connect } from "react-redux"

import ButtonProcess from "./button-process"

import { getItem } from "../actions/item-detail-actions"

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
		item: store.item_detail_store.item,
		loading: store.item_detail_store.loading
	}
})
export default class ItemDetail extends React.Component {
	componentWillMount() {
		this.props.dispatch(getItem(this.props.params.itemId))
	}
	render() {
		const item = this.props.item
		const itemImage = (function() {
			if (item.data) {
				return <img src={"../themes/default/assets/images/" + item.data.itemImage} />
			}
		})()
		const itemPrice = (function() {
			if (item.data) {
				return <div className="ui blue sub header">{currencyFormatter.format(item.data.itemPrice, currencyFormat)}</div>
			}
		})()
		const itemStock = (function() {
			if (item.data) {
				if (item.data.itemStock > 0) {
					return <div className="ui green sub header">{"IN STOCK(" + item.data.itemStock + ")"}</div>
				}
				else {
					return <div className="ui red sub header">OUT OF STOCK</div>
				}
			}
		})()
		const itemHeader = (function() {
			if (item.data) {
				return <div className="ui header">{item.data.itemName}<div className="ui list">{itemPrice}{itemStock}</div></div>
			}
		})()
		const itemDescription = (function() {
			if (item.data) {
				return <p>{item.data.itemDescription}</p>
			}
		})()
		return (
			<div className="ui container">
      	<div className="ui bottom attached segment">
					<div className="image content">
						<div className="ui stackable grid">
							<div className="six wide column center aligned">
					    	<div className="ui image medium">
					    		{itemImage}
					    	</div>
				    	</div>
				    	<div className="ten wide column">
					    	<div className="description">
						    	{itemHeader}
						    	{itemDescription}
					    	</div>
				    	</div>
				    </div>
					</div>
        </div>
				<div className="actions">
		    	<ButtonProcess id={this.props.id} label="Add to cart" />
				</div>
			</div>
		)
	}
}
