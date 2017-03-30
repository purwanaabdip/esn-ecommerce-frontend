"use strict"

import React from "react"
import { Link } from "react-router"

import ItemDetail from "./item-detail"
import ButtonProcess from "./button-process"
import Rating from "./rating"

// Currency Formatter
import currencyFormatter from "currency-formatter"
const currencyFormat = {
  symbol: "Rp.",
  decimal: ",",
  thousand: ".",
  precision: 1,
  format: "%s %v" // %s is the symbol and %v is the value
}

export default class Item extends React.Component {
	componentDidMount() {
		$(".ui.right.corner.red.label").popup()
	}
	showDetails() {
		$("#" + this.props.id).modal({
			blurring: true
		}).modal("show")
	}
  render() {
    return (
    	<div className="card">
	    	<Link to={"/item/" + this.props.item.itemId} className="ui image">
					<div class="ui right corner red label" data-content="Best seller">
						<i class="heart icon"></i>
					</div>
    			<img src={"../uploads/" + this.props.item.itemImage}></img>
    		</Link>
    		<div className="content">
		    <div className="extra center aligned">
		    	<Rating />
		    </div>
	    	<div className="header center aligned">{this.props.item.itemName}</div>
	    	<div className="meta center aligned">
	        	<div className="group">{currencyFormatter.format(this.props.item.itemPrice, currencyFormat)}</div>
						{
							this.props.item.itemCategory ? (
								<div className="ui orange horizontal label">{this.props.item.itemCategory.toUpperCase()}</div>
							) : ( "" )
						}
						{
							this.props.item.itemGenre ? (
								<div className="ui teal horizontal label">{this.props.item.itemGenre.toUpperCase()}</div>
							) : ( "" )
						}
	    	</div>
	    </div>
	    <div className="ui two bottom attached buttons">
			<Link to={"/item/" + this.props.item.itemId} className="ui button">
				Details
			</Link>
			<ButtonProcess id={this.props.item.itemId} label="Add"/>
	    </div>
    	</div>
    )
  }
}
