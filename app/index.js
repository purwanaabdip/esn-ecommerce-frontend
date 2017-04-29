"use strict"
import React from "react"
import ReactDOM from "react-dom"
import { Provider } from "react-redux"
import { BrowserRouter as Router, Route, IndexRoute, Link } from "react-router-dom"

import Sidebar from "./components/sidebar"
import Navigation from "./components/navigation"
import Footer from "./components/footer"
import Home from "./components/home"
import UserInfo from "./components/user-info"
import ItemDetail from "./components/item-detail"

import AdminRoot from "./components/admin/admin-root"
import HomeAdmin from "./components/home"
import ItemManagement from "./components/admin/item-management"

import store from "./reducers/store"

ReactDOM.render(
  <Provider store={store}>
    <Router>
      <div className="pusher">
        <Sidebar />
        <Navigation />
        {/* Place all routes here */}
        <Route exact path="/" component={Home}/>
        <Route path="/admin/item-management" component={ItemManagement}/>
        <Route path="/item/:itemId" component={ItemDetail}/>
        <Footer />
      </div>
    </Router>
  </Provider>,
  document.body
)
