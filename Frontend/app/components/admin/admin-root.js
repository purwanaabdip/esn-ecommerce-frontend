// ================================
// Created by Eka Setya Nugraha.
// Copyright 26/01/2017.
// ================================
import React from 'react';

import Sidebar from '../sidebar';
import Navigation from '../navigation';
import Footer from '../footer';

export default class AdminRoot extends React.Component {
    render() {
        return (
          <div>
            <Sidebar />
          	<div className="pusher">
        			<Navigation />
        			{this.props.children}
              <Footer />
      		  </div>
          </div>
        )
    }
}
