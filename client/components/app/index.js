import React, { Component } from 'react';
import { connect } from 'react-redux';

// reducers
import { changeState } from '../../actions';

// selecrors

class App extends Component {
  componentDidMount() {
    const { onChangeState } = this.props;
    onChangeState();
  }

  render() {
    const { mainState } = this.props;
    return (
      <div>{mainState}</div>
    );
  }
}

const mapStateToProps = (state) => ({
  mainState: state.main.mainState
});

const mapDispatchToProps = (dispatch) => ({
  onChangeState: () => {
    dispatch(changeState());
  },
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(App);
