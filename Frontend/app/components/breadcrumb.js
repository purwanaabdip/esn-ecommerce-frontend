"use strict"

import React from "react"

export default class Breadcrumb extends React.Component {
  render() {
    return (
    	<div className="ui breadcrumb">
    		<div className="active section">{this.props.title}</div>
    	</div>
    )
  }
}
