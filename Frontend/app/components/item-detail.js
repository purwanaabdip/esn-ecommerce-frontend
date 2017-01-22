// ================================
// Created by Eka Setya Nugraha.
// Copyright 10/10/2016.
// ================================
import React from 'react';

import ButtonProcess from './button-process';

export default class ItemDetail extends React.Component {
	render() {
		return (
			<div className="ui" id={this.props.id}>
				<i className="icon close"></i>
				<div className="image content">
					<div className="ui stackable grid">
						<div className="six wide column center aligned">
					    	<div className="ui image medium">
					    		<img src={this.props.src} />
					    	</div>
				    	</div>
				    	<div className="ten wide column">
					    	<div className="description">
						    	<div className="ui header">{this.props.name}
						    		<div className="ui list">
						    			<div className="ui blue sub header">Rp. {this.props.price}</div>
						    			<div className="ui green sub header">In Stock</div>
						    		</div>
						    	</div>
						    	<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas sed tempus lorem. 
						    	Donec aliquam, quam quis sodales pretium, orci nisi aliquet nunc, a ornare ante nulla quis metus. 
						    	Nullam dolor risus, venenatis vel mollis nec, vehicula eget urna. 
						    	Integer non vestibulum urna, ut finibus ex. Aliquam a elit dapibus, semper eros in, elementum ligula. 
						    	Nulla justo nisl, accumsan nec ullamcorper quis, aliquet ac dolor.</p>
					    	</div>
				    	</div>
				    </div>	
				</div>
				<div className="actions">
					<div className="ui deny button">Cancel</div>
			    	<ButtonProcess id={this.props.id} label="Add to cart" />
				</div>
			</div>
		)
	}
}