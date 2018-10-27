import React from 'react';
import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';

import styles from './styles';

export const ErrorPage = ({ code, description, image, classes }) => (
  <div className={classes.container}>
    <Typography className={classes.statusCode}>{code}</Typography>
    <Typography className={classes.statusDescription}>{description}</Typography>
    <img src={image} alt="error page" />
  </div>
);

ErrorPage.propTypes = {
  classes: PropTypes.object.isRequired,
  code: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  description: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
};

export default withStyles(styles)(ErrorPage);
