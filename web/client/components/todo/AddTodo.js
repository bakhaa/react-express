import React from 'react';
import PropTypes from 'prop-types';
import { graphql, compose } from 'react-apollo';
import { withFormik } from 'formik';
import styled from 'styled-components';

import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

import { todosQuery, addTodoMutation } from './graphql';

const Wrap = styled.div`
  display: flex;
  margin-bottom: 10px;
`;

const AddTodo = ({ values, handleChange, handleSubmit, isSubmitting }) => (
  <Wrap>
    <TextField
      style={{ width: 200, height: 40, marginTop: 0 }}
      id="outlined-bare"
      value={values.text}
      name="text"
      placeholder="Enter text"
      margin="normal"
      variant="outlined"
      onChange={handleChange}
    />
    <TextField
      style={{ width: 300, height: 40, marginTop: 0, marginLeft: 5 }}
      id="outlined-bare"
      value={values.description}
      name="description"
      placeholder="Enter description"
      margin="normal"
      variant="outlined"
      onChange={handleChange}
    />
    <Button
      variant="outlined"
      style={{ height: 40, marginLeft: 10, marginRight: 10 }}
      color="primary"
      onClick={handleSubmit}
      disabled={isSubmitting}
    >
      {isSubmitting ? 'Submitting...' : 'Add'}
    </Button>
  </Wrap>
);

AddTodo.propTypes = {
  values: PropTypes.object.isRequired,
  handleChange: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  isSubmitting: PropTypes.bool.isRequired,
};

export default compose(
  graphql(addTodoMutation),
  withFormik({
    mapPropsToValues: () => ({ text: '', description: '' }),
    handleSubmit: async (values, { props: { mutate }, setSubmitting, resetForm }) => {
      if (values.text === '') {
        setSubmitting(false);
        return;
      }
      await mutate({
        variables: {
          text: values.text,
          description: values.description,
        },
        optimisticResponse: {
          addTodo: {
            __typename: 'Mutation',
            ok: true,
            todo: {
              __typename: 'Todo',
              _id: -1,
              text: values.text,
              completed: false,
              description: values.description,
              created: -1,
            },
          },
        },
        update: (store, { data: { addTodo } }) => {
          const { ok, todo } = addTodo;
          if (!ok) return;

          const data = store.readQuery({ query: todosQuery });
          data.getTodos.unshift(todo);
          store.writeQuery({ query: todosQuery, data });
        },
      });
      resetForm();
      setSubmitting(false);
    },
  }),
)(AddTodo);
