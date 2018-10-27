import React from 'react';
import PropTypes from 'prop-types';
import { Switch, Route } from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';

// screens
import {
  HomePage,
  TodoPage,
  NotFoundPage,
  ServerErrorPage,
  PermissionsDeniedPage,
} from '../../pages';

import Bar from './MainBar';
import Nav from './Nav';

import styles from './styles';

export const Main = ({ classes }) => (
  <div className={classes.root}>
    <Bar />
    <Nav />
    <main className={classes.content}>
      <Switch>
        <Route path="/" exact component={HomePage} />
        <Route path="/todo" component={TodoPage} />
        <Route path="/403" component={PermissionsDeniedPage} />
        <Route path="/500" component={ServerErrorPage} />
        <Route path="*" component={NotFoundPage} />
      </Switch>
    </main>
  </div>
);

Main.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Main);
