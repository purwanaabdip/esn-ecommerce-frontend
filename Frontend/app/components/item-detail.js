// ================================
// Created by Eka Setya Nugraha.
// Copyright 10/10/2016.
// ================================
import React from 'react';

import Breadcrumb from './breadcrumb';
import ButtonProcess from './button-process';

import ItemDetailStore from '../stores/item-detail-store'
import * as ItemDetailActions from '../actions/item-detail-actions'

export default class ItemDetail extends React.Component {
	constructor() {
		super();
		this.refresh = this.refresh.bind(this);
		this.state = ItemDetailStore.getState();
	}

	componentWillMount() {
		ItemDetailStore.on('change', this.refresh);
		ItemDetailActions.getItem(this.props.params.itemId);
	}

	componentWillUnmount() {
		ItemDetailStore.removeListener('change', this.refresh);
	}

	refresh() {
		this.setState(ItemDetailStore.getState());
	}

	render() {
		const item = this.state.item;
		// Header title
		const itemBreadcrumb = (function() {
			if (item.data) {
				return <Breadcrumb title={item.data.itemId} />;
			}
		})();
		const itemImage = (function() {
			if (item.data) {
				return <img src={"../themes/default/assets/images/" + item.data.itemImage} />;
			}
		})();
		const itemPrice = (function() {
			if (item.data) {
				return <div className="ui blue sub header">Rp. {item.data.itemPrice}</div>
			}
		})();
		const itemStock = (function() {
			if (item.data) {
				if (item.data.itemStock > 0) {
					return <div className="ui green sub header">{"IN STOCK(" + item.data.itemStock + ")"}</div>
				}
				else {
					return <div className="ui red sub header">OUT OF STOCK</div>
				}
			}
		})();
		const itemHeader = (function() {
			if (item.data) {
				return <div className="ui header">{item.data.itemName}<div className="ui list">{itemPrice}{itemStock}</div></div>
			}
		})();
		const itemDescription = (function() {
			if (item.data) {
				return <p>{item.data.itemDescription}</p>
			}
		})();
		const itemBuyButton = (function() {
			if (item.data) {
				return <div className="ui circular segment"><h2 className="ui header">Buy Now<div className="sub header">{itemPrice}</div></h2></div>
			}
		})();
		return (
			<div className="ui container">
      	<div className="ui top attached block header">
      		{itemBreadcrumb}
      	</div>
      	<div className="ui bottom attached segment">
					<div className="image content">
						<div className="ui stackable grid">
							<div className="six wide column center aligned">
					    	<div className="ui image medium">
					    		{itemImage}
					    	</div>
				    	</div>
				    	<div className="ten wide column">
					    	<div className="description">
						    	{itemHeader}
						    	{itemDescription}
					    	</div>
								{itemBuyButton}
				    	</div>
							<div className="ui threaded comments">
								<h3 className="ui dividing header">Comments</h3>
								<div className="comment">
									<a className="avatar">
										<img src="../themes/default/assets/images/user1.jpg"/>
									</a>
									<div className="content">
										<a className="author">Matt</a>
										<div className="metadata">
											<span className="date">Today at 5:42PM</span>
										</div>
										<div className="text">
											How artistic!
										</div>
										<div className="actions">
											<a className="reply">Reply</a>
										</div>
									</div>
								</div>
								<div className="comment">
									<a className="avatar">
										<img src="../themes/default/assets/images/user2.jpg"/>
									</a>
									<div className="content">
										<a className="author">Elliot Fu</a>
										<div className="metadata">
											<span className="date">Yesterday at 12:30AM</span>
										</div>
										<div className="text">
											<p>This has been very useful for my research. Thanks as well!</p>
										</div>
										<div className="actions">
											<a className="reply">Reply</a>
										</div>
									</div>
									<div className="comments">
										<div className="comment">
											<a className="avatar">
												<img src="../themes/default/assets/images/user3.jpg"/>
											</a>
											<div className="content">
												<a className="author">Jenny Hess</a>
												<div className="metadata">
													<span className="date">Just now</span>
												</div>
												<div className="text">
													Elliot you are always so right :)
												</div>
												<div className="actions">
													<a className="reply">Reply</a>
												</div>
											</div>
										</div>
									</div>
								</div>
								<div className="comment">
									<a className="avatar">
										<img src="../themes/default/assets/images/user4.jpg"/>
									</a>
									<div className="content">
										<a className="author">Joe Henderson</a>
										<div className="metadata">
											<span className="date">5 days ago</span>
										</div>
										<div className="text">
											Dude, this is awesome. Thanks so much
										</div>
										<div className="actions">
											<a className="reply">Reply</a>
										</div>
									</div>
								</div>
								<form className="ui reply form">
									<div className="field">
										<textarea></textarea>
									</div>
									<div className="ui blue labeled submit icon button">
										<i className="icon edit"></i> Reply
									</div>
								</form>
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
