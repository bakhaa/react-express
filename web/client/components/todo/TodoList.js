import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { graphql, compose } from 'react-apollo';
import Typography from '@material-ui/core/Typography';
import Todo from './Todo';

import { todosQuery } from './graphql';

class TodoList extends PureComponent {
  redirect() {
    const { history } = this.props;
    history.push('/500');
  }

  componentWillReceiveProps(nextProps) {
    const {
      data: { loading },
    } = this.props;

    if (loading && !nextProps.data.loading) {
      if (nextProps.data.error) {
        this.redirect();
      }
    }
  }

  render() {
    const {
      data: { loading, getTodos },
    } = this.props;

    if (loading) return <Typography>Loading...</Typography>;
    if (!getTodos) return null;

    return (
      <div style={{ maxWidth: 500 }}>
        {getTodos.map(item => (
          <Todo key={item._id} text={item.text} />
        ))}
      </div>
    );
  }
}

TodoList.propTypes = {
  data: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
};

export default compose(
  withRouter,
  graphql(todosQuery, {
    options: () => ({
      fetchPolicy: 'network-only',
    }),
  }),
)(TodoList);
