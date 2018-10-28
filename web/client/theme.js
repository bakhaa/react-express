import { createMuiTheme } from '@material-ui/core/styles';

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

theme.shadows[1] = 'none';
theme.shadows[2] = 'none';

export default theme;
