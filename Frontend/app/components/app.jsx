// ================================
// Created by ekasetya.
// Copyright 10/18/16.
// ================================
import React from 'react';

import Navigation from './navigation';

export default class App extends React.Component {
    render() {
        return (
        	<div className="pusher" id="app">
        		<div id="navigation">
        			<Navigation />
        		</div>
        		<div id="content">
        			{this.props.children}
        		</div>
    		</div>
        )
    }
}