import React from 'react';
import { MuiThemeProvider } from '@material-ui/core/styles';
import theme from './theme';

import Main from './components/main';

const App = () => (
  <MuiThemeProvider theme={theme}>
    <Main />
  </MuiThemeProvider>
);

export default App;
