// ================================
// Created by ekasetya.
// Copyright 10/18/16.
// ================================
import React from 'react';

import Navigation from './navigation';
import Sidebar from './sidebar';

export default class App extends React.Component {
    render() {
        return (
          <div>
            <Sidebar />
          	<div className="pusher">
        			<Navigation />
        			{this.props.children}
      		  </div>
          </div>
        )
    }
}
