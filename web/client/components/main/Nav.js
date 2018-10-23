import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import { Drawer, List } from '@material-ui/core';

// icons
import { Dashboard, Event } from '@material-ui/icons';

import NavItem from './navItem';

const drawerWidth = 60;

const styles = theme => ({
  drawerPaper: {
    whiteSpace: 'nowrap',
    width: drawerWidth,
    maxWidth: drawerWidth,
    overflowX: 'hidden',
    border: 'none',
  },
  toolbar: {
    ...theme.mixins.toolbar,
  },
});

const links = [
  {
    to: '/',
    icon: <Dashboard />,
    title: 'Home',
    exact: true,
  },
  {
    to: '/todo',
    icon: <Event />,
    title: 'Todos',
  },
];

export const Nav = ({ classes }) => (
  <Drawer
    variant="permanent"
    position="fixed"
    classes={{
      paper: classNames(classes.drawerPaper),
    }}
  >
    <div className={classes.toolbar} />
    <List>
      {links.map((item, idx) => (
        <NavItem key={idx} {...item} /> // eslint-disable-line
      ))}
    </List>
  </Drawer>
);

Nav.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Nav);
