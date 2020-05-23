import React from 'react';
import { Router, Route, Switch } from 'react-router-dom';
import { createBrowserHistory } from "history";

import './index.scss';
import links from './config/index'
import Link from './page/login/index'
import Home from './page/home/index'
import Promote from './page/home/promote/index'

const history = createBrowserHistory();

function App() {
  return (
    <Router history={history}>
      <Switch>
        <Route exact path={links.home} component={Home} />
        <Route exact path={links.login} component={Link} />
        <Route exact path={links.promote} component={Promote} />
      </Switch>
    </Router>
  );
}

export default App;
