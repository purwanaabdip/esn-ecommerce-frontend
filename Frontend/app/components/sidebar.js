// ================================
// Created by Eka Setya Nugraha.
// Copyright 10/28/2016.
// ================================
import React from 'react';
import ReactDOM from 'react-dom';
import { Link } from 'react-router';

export default class Sidebar extends React.Component {

    render() {
        return (
            <div class="ui right sidebar" id="sidebar">
            </div>
        )
    }
}

ReactDOM.render(<Sidebar />, document.body)