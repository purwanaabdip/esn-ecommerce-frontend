"use strict"

import React from "react"

import Sidebar from "./sidebar"
import Navigation from "./navigation"
import Footer from "./footer"

export default class App extends React.Component {
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