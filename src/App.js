import React from 'react';
import { Router, Route, Switch } from 'react-router-dom';
import { createBrowserHistory } from "history";

import './index.scss';
import links from './config/index'
import Link from './page/login/index'
import Home from './page/home/index'
import Promote from './page/home/promote/index'
import CompanyAnnouncement from './page/home/companyAnnouncement/index'
import DeprtmentAnnouncement from './page/home/departmentAnnouncement/index'
import Analytics from './page/home/analytics/index'
import Setup from './page/home/setup/index'
import Support from './page/home/support/index'
import Editor from './page/home/editor/index'
import Publish from './page/home/publish/index'

const history = createBrowserHistory();

function App() {
  return (
    <Router history={history}>
      <Switch>
        <Route exact path={links.home} component={Home} />
        <Route exact path={links.login} component={Link} />
        <Route exact path={links.promote} component={Promote} />
        <Route exact path={links.companyAnnoun} component={CompanyAnnouncement} />
        <Route exact path={links.departmentAnnoun} component={DeprtmentAnnouncement} />
        <Route exact path={links.analytics} component={Analytics} />
        <Route exact path={links.setup} component={Setup} />
        <Route exact path={links.support} component={Support} />
        <Route exact path={links.editor} component={Editor} />
        <Route exact path={links.publish} component={Publish} />
      </Switch>
    </Router>
  );
}

export default App;
