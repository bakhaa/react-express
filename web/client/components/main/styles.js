const styles = theme => ({
  root: {
    flexGrow: 1,
    overflow: 'hidden',
    position: 'relative',
    display: 'flex',
    height: '100%',
  },
  content: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.default,
    padding: theme.spacing.unit * 3,
    marginLeft: 60,
    minHeight: 'calc(100vh - 104px)',
    overflow: 'hidden',
  },
});

export default styles;
