"use strict"

import React from "react"
import { Link } from "react-router"

import ItemDetail from "./item-detail"
import ButtonProcess from "./button-process"
import Rating from "./rating"

export default class Item extends React.Component {
	showDetails() {
		$("#" + this.props.id).modal({
			blurring: true
		}).modal("show")
	}
  render() {
    return (
    	<div className="card">
	    <div className="ui image">
    			<img src={this.props.src}></img>
    		</div>
    		<div className="content">
		    <div className="extra center aligned">
		    	<Rating />
		    </div>
	    	<div className="header center aligned">{this.props.name}</div>
	    	<div className="meta center aligned">
	        	<div className="group">{this.props.price}</div>
	    	</div>
	    </div>
	    <div className="ui two bottom attached buttons">
			<Link to={"/item/" + this.props.id} className="ui button">
				Details
			</Link>
			<ButtonProcess id={this.props.id} label="Add"/>
	    </div>
    	</div>
    )
  }
}
