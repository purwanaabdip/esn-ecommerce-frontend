"use strict"

import React from "react"

import Sidebar from "../sidebar"
import Navigation from "../navigation"
import Footer from "../footer"

export default class AdminRoot extends React.Component {
  render() {
    return (
      <div>
        {this.props.children}
      </div>
    )
  }
}
