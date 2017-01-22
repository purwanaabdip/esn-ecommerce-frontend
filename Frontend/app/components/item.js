// ================================
// Created by Eka Setya Nugraha.
// Copyright 10/12/2016.
// ================================
import React from 'react';

import ItemDetail from './item-detail';
import ButtonProcess from './button-process';
import Rating from './rating';

export default class Item extends React.Component {
	
	showDetails() {
		$("#" + this.props.id).modal({
			blurring: true
		}).modal('show');
	}

    render() {
        return (
        	<div className="card">
			    <div className="extra center aligned">
			    	<Rating />
			    </div>
			    <div className="ui image">
        			<img src={this.props.src}></img>
        		</div>
        		<div className="content">
			    	<div className="header">{this.props.name}</div>
			    	<div className="meta">
			        	<div className="group">Rp. {this.props.price}</div>
			    	</div>
			    	<div className="description">
				    	Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
				    	Nam dui purus, porttitor sit amet erat sed, pharetra tincidunt eros. 
				    	Praesent condimentum a enim non hendrerit.
				    </div>
			    </div>
			    <div className="ui two bottom attached buttons">
					<div className="ui button" onClick={this.showDetails.bind(this)}>
						Details
					</div>
					<ButtonProcess id={this.props.id} label="Add"/>
			    </div>
		        <ItemDetail src={this.props.src} id={this.props.id} name={this.props.name} price={this.props.price}/>
        	</div>
        )
    }
}