// ================================
// Created by Eka Setya Nugraha.
// Copyright 01/22/2017.
// ================================
import React from 'react';

export default class Loader extends React.Component {
  render() {
    return (
    	<div className="ui active dimmer" id="loader">
    		<div className="ui indeterminate text loader">Fetching data</div>
    	</div>
    )
  }
}