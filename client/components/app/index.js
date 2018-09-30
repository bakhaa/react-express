import React from 'react';
import { Route, Switch } from 'react-router-dom';

import Nav from '../nav';

// pages
import ListPage from '../../pages/ListPage';
import HomePage from '../../pages/HomePage';

const App = () => (
  <div>
    <Nav />
    <main>
      <Switch>
        <Route path="/" exact component={HomePage} />
        <Route path="/list" component={ListPage} />
      </Switch>
    </main>
  </div>
);

export default App;
