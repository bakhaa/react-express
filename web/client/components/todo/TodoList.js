import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { graphql, compose } from 'react-apollo';
import styled from 'styled-components';

import CircularProgress from '@material-ui/core/CircularProgress';
import Typography from '@material-ui/core/Typography';

import Todo from './Todo';

import { todosQuery } from './graphql';

const Loader = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
  margin-top: 10px;
`;

const List = styled.div`
  width: 100%;
`;

class TodoList extends PureComponent {
  constructor(props) {
    super(props);
    this.state = { expandedId: '' };

    this.onChangeExpanded = this.onChangeExpanded.bind(this);
  }

  onChangeExpanded(id) {
    const { expandedId } = this.state;

    this.setState({
      expandedId: expandedId === id ? null : id,
    });
  }

  componentWillReceiveProps(nextProps) {
    const { history } = this.props;

    if (nextProps.data.error) {
      if (nextProps.data.error.message === 'GraphQL error: Not authenticated') {
        history.push('/login');
        return;
      }
      history.push('/500');
    }
  }

  render() {
    const {
      data: { loading, getTodos },
    } = this.props;
    const { expandedId } = this.state;

    if (loading) {
      return (
        <Loader>
          <CircularProgress />
        </Loader>
      );
    }

    if (!getTodos) return null;
    if (!getTodos.length) return <Typography>Todo list is empty, add a new task...</Typography>;

    return (
      <List>
        {getTodos.map(item => (
          <Todo
            key={item._id}
            expandedId={expandedId}
            item={item}
            onChange={this.onChangeExpanded}
          />
        ))}
      </List>
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
