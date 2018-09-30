import React from 'react';
import { Switch, Route } from 'react-router-dom';

const A = () => (
  <div>A</div>
);

const B = () => (
  <div>B</div>
);

export const App = () => (
  <Switch>
    <Route path="/" exact component={A} />
    <Route path="/b" component={B} />
  </Switch>
);
