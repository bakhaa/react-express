import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';
import { Tooltip, IconButton } from '@material-ui/core';

const styles = () => ({
  navButton: {
    display: 'flex',
    margin: '0 auto',
    color: 'rgb(66, 82, 110)',
    marginTop: 5,
    width: 50,
    height: 50,
    padding: 0,
  },
  navActive: {
    backgroundColor: 'rgba(66, 82, 110, .1)',
  },
  tooltip: {
    backgroundColor: '#172b4d',
    position: 'absolute',
    top: -10,
  },
});

export const NavItem = ({ classes, title, to, icon, exact }) => (
  <Tooltip
    enterDelay={150}
    leaveDelay={200}
    placement="right"
    classes={{
      tooltip: classNames(classes.tooltip),
    }}
    title={title}
  >
    <IconButton
      exact={exact}
      aria-label={title}
      component={NavLink}
      activeClassName={classes.navActive}
      to={to}
      className={classes.navButton}
    >
      {icon}
    </IconButton>
  </Tooltip>
);

NavItem.defaultProps = {
  exact: false,
};

NavItem.propTypes = {
  classes: PropTypes.object.isRequired,
  title: PropTypes.string.isRequired,
  to: PropTypes.string.isRequired,
  icon: PropTypes.node.isRequired,
  exact: PropTypes.bool,
};

export default withStyles(styles)(NavItem);
