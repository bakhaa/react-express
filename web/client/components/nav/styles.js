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

export default styles;
