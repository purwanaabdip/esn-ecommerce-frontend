"use strict"

import React from "react"

export default class Footer extends React.Component {
    render() {
        return (
          <div className="ui inverted vertical segment footer">
            <div className="ui container">
              <div className="ui stackable inverted divided equal height stackable grid">
                <div className="three wide column">
                  <h4 className="ui inverted header">About</h4>
                  <div className="ui inverted link list">
                    <a className="item">Sitemap</a>
                    <a className="item">Contact Us</a>
                    <a className="item">Religious Ceremonies</a>
                    <a className="item">Gazebo Plans</a>
                  </div>
                </div>
                <div className="three wide column">
                  <h4 className="ui inverted header">Services</h4>
                  <div className="ui inverted link list">
                    <a className="item">Banana Pre-Order</a>
                    <a className="item">DNA FAQ</a>
                    <a className="item">How To Access</a>
                    <a className="item">Favorite X-Men</a>
                  </div>
                </div>
                <div className="seven wide column">
                  <h4 className="ui inverted header">Footer Header</h4>
                  <p>Extra space for a call to action inside the footer that could help re-engage users.</p>
                </div>
              </div>
            </div>
          </div>
        )
    }
}
