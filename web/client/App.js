import React from 'react';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';

import Main from './components/main';

const theme = createMuiTheme({
  typography: {
    useNextVariants: true,
  },
  palette: {
    primary: {
      main: '#172b4d',
    },
    background: {
      paper: 'rgb(232, 234, 235)',
    },
  },
});

const App = () => (
  <MuiThemeProvider theme={theme}>
    <Main />
  </MuiThemeProvider>
);

export default App;
