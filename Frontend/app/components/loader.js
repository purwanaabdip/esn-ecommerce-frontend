"use strict"

import React from "react"

export default class Loader extends React.Component {
  render() {
    return (
    	<div className="ui active dimmer" id="loader">
    		<div className="ui indeterminate text loader">Fetching data</div>
    	</div>
    )
  }
}
