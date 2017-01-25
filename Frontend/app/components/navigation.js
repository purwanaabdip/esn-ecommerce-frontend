// ================================
// Created by Eka Setya Nugraha.
// Copyright 10/10/2016.
// ================================
import React from 'react';
import { Link } from 'react-router';

export default class Navigation extends React.Component {
    componentDidMount() {
        $('#cart-sidebar').click(function(event) {
            $('.ui.sidebar').sidebar('toggle');
        });
    }

    render() {
        return (
            <div className="ui borderless main menu">
                <Link to="/" className="header item">
                    <img className="logo" src="./themes/default/assets/images/favicon.png"/>
                    Kocak Store
                </Link>
                <div className="ui simple dropdown item" tabIndex="0">Categories
                    <i className="dropdown icon"></i>
                    <div className="menu" tabIndex="-1">
                        <Link to="/ps4" className="item">PS4</Link>
                    </div>
                </div>
                <div className="right menu">
                    <div className="ui simple dropdown item" tabIndex="0">
                        <i className="icon user"></i>
                        <span>My account</span>
                        <div className="menu" tabIndex="-1">
                            <Link to="/user-info" className="item">Edit info</Link>
                            <div className="item">Purchase History</div>
                            <div className="divider"></div>
                            <div className="item">Settings</div>
                        </div>
                    </div>
                    <a className="item" id="cart-sidebar">
                        <i className="icon cart"></i>
                        <span>My cart</span>
                        <div className="ui teal circular label">22</div>
                    </a>
                </div>
            </div>
        )
    }
}
