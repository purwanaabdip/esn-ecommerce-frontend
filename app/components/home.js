"use strict"

import React from "react"
import { connect } from "react-redux"

import Item from "./item"
import Loader from "./loader"

import { getItems } from "../actions/item-actions"

// Connect to reducer
@connect((store) => {
	return {
		items: store.item_store.items,
		loading: store.item_store.loading
	}
})
export default class Home extends React.Component {
	componentWillMount() {
		this.getItems()
	}
	getItems() {
		this.props.dispatch(getItems())
	}
	renderLoader() {
		if (this.props.loading === true) {
			return <Loader />
		}
	}
	renderItem(item) {
		// Item component
		return <Item key={item._id} id={item._id} item={item.data}/>
	}
  render() {
    return (
			<div className="ui container">
      	<div className="ui bottom attached segment">
          <div className="ui special four stackable doubling cards">
						{
							// Show loader
							this.renderLoader()
						}
						{
							// Item components
							this.props.items.map(item => this.renderItem(item))
						}
          </div>
	      </div>
      </div>
    )
  }
}
