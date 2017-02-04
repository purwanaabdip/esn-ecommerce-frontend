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
                    <img className="logo" src="/themes/default/assets/images/favicon.png"/>
                    Kocak Store
                </Link>
                <div className="ui simple dropdown item" tabIndex="0">Categories
                    <i className="dropdown icon"></i>
                    <div className="menu" tabIndex="-1">
                        <a className="item">Playstation 3</a>
                        <a className="item">Playstation 4</a>
                        <a className="item">Xbox 360</a>
                        <a className="item">Xbox One</a>
                        <a className="item">Nintendo WiiU</a>
                        <a className="item">Nintendo 3DS</a>
                    </div>
                </div>
                <div className="right menu">
                    <div className="ui simple dropdown item" tabIndex="0">Admin
                        <i className="dropdown icon"></i>
                        <div className="menu" tabIndex="-1">
                            <Link to="/admin/item-management" className="item">Item Management</Link>
                        </div>
                    </div>
                    <div className="ui simple dropdown item" tabIndex="0">
                        <i className="icon user"></i>
                        <span>My account</span>
                        <div className="menu" tabIndex="-1">
                            <div className="item">Account Settings</div>
                            <div className="item">Purchase History</div>
                            <div className="divider"></div>
                            <div className="item">Logout</div>
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
