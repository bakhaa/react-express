import React from 'react';
import { MuiThemeProvider } from '@material-ui/core/styles';
import theme from './theme';

import Routes from './routes';

const App = () => (
  <MuiThemeProvider theme={theme}>
    <Routes />
  </MuiThemeProvider>
);

export default App;
