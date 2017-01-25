import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, IndexRoute, Link, hashHistory } from 'react-router';

import App from './app';
import Home from './home';
import UserInfo from './user-info';
import ItemDetail from './item-detail';

ReactDOM.render(
  <Router history={hashHistory}>
  	<Route path="/" component={App}>
  		<IndexRoute component={Home}/>
      	<Route path="user-info" component={UserInfo} />
      	<Route path="contact" component={Home} />
      	<Route path="item/:itemId" component={ItemDetail} />
  	</Route>
  </Router>,
  document.getElementById('app')
);
