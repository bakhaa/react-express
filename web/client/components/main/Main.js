import React from 'react';
import PropTypes from 'prop-types';
import { Switch, Route } from 'react-router-dom';

import { withStyles } from '@material-ui/core/styles';

// screens
import { HomePage, TodoPage, ProfilePage } from '../../pages';

import { Nav } from '../nav';

import styles from './styles';

export const Main = ({ classes, me }) => (
  <div className={classes.root}>
    <Nav me={me} />
    <main className={classes.content}>
      <Switch>
        <Route path="/" exact component={HomePage} />
        <Route path="/todo" exact component={TodoPage} />
        <Route path="/profile" exact component={ProfilePage} />
      </Switch>
    </main>
  </div>
);

Main.propTypes = {
  classes: PropTypes.object.isRequired,
  me: PropTypes.object.isRequired,
};

export default withStyles(styles)(Main);
