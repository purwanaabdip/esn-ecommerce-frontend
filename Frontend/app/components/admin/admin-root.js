// ================================
// Created by ekasetya.
// Copyright 01/26/17.
// ================================
import React from 'react';

import Navigation from '../navigation';
import Sidebar from '../sidebar';

export default class AdminRoot extends React.Component {
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
