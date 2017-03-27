"use strict"

import React from "react"
import { Link } from "react-router"

import * as SessionActions from "../actions/session-actions"

export default class Navigation extends React.Component {
  componentDidMount() {
    $("#cart-sidebar").click((event) => $(".ui.sidebar").sidebar("toggle"))
  }

  login() {
    SessionActions.login($("#username").val(), $("#password").val())
  }

  logout() {
    SessionActions.logout()
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
            <span>Login</span>
            <div className="menu" tabIndex="-1">
              <div className="ui input">
                <input id="username" type="text" placeholder="Username"/>
              </div>
              <div className="ui input">
                <input id="password" type="password" placeholder="Password"/>
              </div>
              <div className="ui input">
                <button className="fluid ui primary button" onClick={this.login}>Login</button>
              </div>
              <div className="item">Account Settings</div>
              <div className="item">Purchase History</div>
              <div className="divider"></div>
              <div className="item" onClick={this.logout}>Logout</div>
            </div>
          </div>
          <a className="item" id="cart-sidebar">
            <i className="icon cart"></i>
            <span>My cart</span>
            <div className="ui teal circular label">2</div>
          </a>
        </div>
      </div>
    )
  }
}
