"use strict"

import React from "react"

export default class Rating extends React.Component {
	componentDidMount() {
    $(".ui.rating").rating({ maxRating: 5 })
	}
  render() {
    return (
  		<div className="ui star rating"></div>
    )
  }
}
