import React from 'react';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';

import Main from './components/main';

const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#172b4d',
    },
    background: {
      paper: 'rgb(232, 234, 236)',
    },
  },
});
// theme.shadows[2] = 'none';

const App = () => (
  <MuiThemeProvider theme={theme}>
    <Main />
  </MuiThemeProvider>
);

export default App;
