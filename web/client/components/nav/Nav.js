import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import styled from 'styled-components';
import { graphql, compose } from 'react-apollo';
import { withRouter } from 'react-router-dom';

import { withStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import MenuItem from '@material-ui/core/MenuItem';
import IconButton from '@material-ui/core/IconButton';
import Menu from '@material-ui/core/Menu';
// icons
import { AccountCircle } from '@material-ui/icons';

import { logoutMutation } from './graphql';

import NavItem from './navItem';
import Links from './links';
import styles from './styles';

const Bottom = styled.div`
  position: absolute;
  padding-bottom: 25px;
  width: 100%;
  bottom: 0;
`;

class Nav extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      anchorEl: null,
    };
    this.handleMenu = this.handleMenu.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.handleLogout = this.handleLogout.bind(this);
  }

  handleMenu(event) {
    this.setState({ anchorEl: event.currentTarget });
  }

  handleClose() {
    this.setState({ anchorEl: null });
  }

  async handleLogout() {
    const { mutate, history } = this.props;

    const response = await mutate();
    const {
      data: {
        logout: { ok },
      },
    } = response;

    if (ok) {
      history.push('/login');
      return;
    }

    this.setState({ anchorEl: null });
  }

  render() {
    const { classes } = this.props;
    const { anchorEl } = this.state;
    const open = Boolean(anchorEl);

    return (
      <Drawer
        variant="permanent"
        position="fixed"
        classes={{
          paper: classNames(classes.drawerPaper),
        }}
      >
        <div className={classes.toolbar} />
        <List>
          {Links.map((item, idx) => (
            <NavItem key={idx} {...item} />
          ))}
        </List>
        <Bottom>
          <IconButton
            aria-owns={open ? 'menu-appbar' : undefined}
            aria-haspopup="true"
            onClick={this.handleMenu}
            color="primary"
            style={{ margin: '0 auto', display: 'block' }}
          >
            <AccountCircle />
          </IconButton>
          <Menu
            id="menu-appbar"
            anchorEl={anchorEl}
            anchorOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
            transformOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
            open={open}
            onClose={this.handleClose}
          >
            <MenuItem onClick={this.handleLogout}>Log out</MenuItem>
          </Menu>
        </Bottom>
      </Drawer>
    );
  }
}

Nav.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default compose(
  withRouter,
  graphql(logoutMutation),
  withStyles(styles),
)(Nav);
