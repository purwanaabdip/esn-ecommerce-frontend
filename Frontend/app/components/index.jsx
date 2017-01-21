import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, IndexRoute, Link, hashHistory } from 'react-router';

import App from './app';
import Home from './home';
import PS4 from './ps4';
import UserInfo from './user-info';

ReactDOM.render(
  <Router history={hashHistory}>
  	<Route path="/" component={App}>
  		<IndexRoute component={Home}/>
      	<Route path="ps4" component={PS4} />
      	<Route path="user-info" component={UserInfo} />
      	<Route path="contact" component={Home} />
  	</Route>
  </Router>,
  document.getElementById('app')
);