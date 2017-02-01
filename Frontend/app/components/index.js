// ================================
// Created by Eka Setya Nugraha.
// Copyright 10/11/2016.
// ================================
import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, IndexRoute, Link, hashHistory } from 'react-router';

import App from './app';
import Home from './home';
import UserInfo from './user-info';
import ItemDetail from './item-detail';

import AdminRoot from './admin/admin-root';
import HomeAdmin from './home';
import ItemManagement from './admin/item-management';

ReactDOM.render(
  <Router history={hashHistory}>
  	<Route path="/" component={App}>
  		<IndexRoute component={Home}/>
      <Route path="user-info" component={UserInfo} />
    	<Route path="contact" component={Home} />
    	<Route path="item/:itemId" component={ItemDetail} />
  	</Route>
    <Route path="/admin" component={AdminRoot}>
    	<IndexRoute component={HomeAdmin}/>
      <Route path="item-management" component={ItemManagement} />
  	</Route>
  </Router>,
  document.getElementById('app')
);
