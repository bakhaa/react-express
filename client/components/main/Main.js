import React from 'react';
import PropTypes from 'prop-types';
import { Switch, Route } from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';

// screens
import {
  HomePage,
  ListPage,
} from '../../pages';

import Bar from './MainBar';
import Nav from './Nav';

const styles = theme => ({
  root: {
    flexGrow: 1,
    overflow: 'hidden',
    position: 'relative',
    display: 'flex',
    height: '100%',
  },
  content: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.default,
    padding: theme.spacing.unit * 3,
    marginLeft: 60,
    paddingTop: 80,
    minHeight: 'calc(100vh - 104px)',
    overflow: 'hidden',
  },
});

export const Main = ({ classes }) => (
  <div className={classes.root}>
    <Bar />
    <Nav />
    <main className={classes.content}>
      <Switch>
        <Route path="/" exact component={HomePage} />
        <Route path="/list" component={ListPage} />
      </Switch>
    </main>
  </div>
);

Main.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Main);
