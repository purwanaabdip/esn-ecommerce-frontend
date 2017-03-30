"use strict"

import React from "react"
import { connect } from "react-redux"

import Sidebar from "./sidebar"
import Navigation from "./navigation"
import Footer from "./footer"

import { ping } from "../actions/session-actions"

// Connect to reducer
@connect((store) => {
	return {
		user: store.user_store.user,
	}
})
export default class App extends React.Component {
  componentWillMount() {
    this.props.dispatch(ping())
  }
  render() {
    return (
      <div>
        <Sidebar />
      	<div className="pusher">
    			<Navigation />
    			{this.props.children}
          <Footer />
  		  </div>
      </div>
    )
  }
}
