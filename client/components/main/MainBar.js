import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';

const styles = theme => ({
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    boxShadow: 'none',
  },
});

export const Bar = ({ classes }) => (
  <AppBar
    position="fixed"
    className={classes.appBar}
  >
    <Toolbar disableGutters={false}>
      <Typography variant="title" color="inherit" noWrap>
        Title page
      </Typography>
    </Toolbar>
  </AppBar>
);

Bar.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Bar);
