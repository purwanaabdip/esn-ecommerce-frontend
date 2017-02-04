// ================================
// Created by Eka Setya Nugraha.
// Copyright 10/11/2016.
// ================================
import React from "react";
import ReactDOM from "react-dom";
import { browserHistory, Router, Route, IndexRoute, Link } from "react-router";

import App from "./components/app";
import Home from "./components/home";
import UserInfo from "./components/user-info";
import ItemDetail from "./components/item-detail";

import AdminRoot from "./components/admin/admin-root";
import HomeAdmin from "./components/home";
import ItemManagement from "./components/admin/item-management";

ReactDOM.render(
  <Router history={browserHistory}>
  	<Route path="/" component={App}>
  		<IndexRoute component={Home}></IndexRoute>
      <Route path="user-info" component={UserInfo}></Route>
    	<Route path="contact" component={Home}></Route>
    	<Route path="item/:itemId" component={ItemDetail}></Route>
      <Route path="admin" component={AdminRoot}>
      	<Route path="home" component={HomeAdmin}></Route>
        <Route path="item-management" component={ItemManagement}></Route>
      </Route>
    </Route>
  </Router>,
  document.getElementById("app")
);
