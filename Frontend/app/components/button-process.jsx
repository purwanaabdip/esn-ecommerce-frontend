// ================================
// Created by Eka Setya Nugraha.
// Copyright 11/7/2016.
// ================================
import React from 'react';

export default class ButtonProcess extends React.Component {

	addToCart() {
		$('#addToCart_' + this.props.id).addClass('loading');
	}
	
	showDetails() {
		$("#" + this.props.id).modal({
			blurring: true
		}).modal('show');
	}

    render() {
        return (
			<div className="ui blue button" id={"addToCart_" + this.props.id} onClick={this.addToCart.bind(this)}>
				<i className="icon cart plus"></i>{this.props.label}
			</div>
        )
    }
}