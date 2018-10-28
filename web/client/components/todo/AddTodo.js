import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { graphql, compose } from 'react-apollo';
import gql from 'graphql-tag';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import FormGroup from '@material-ui/core/FormGroup';
import FormControl from '@material-ui/core/FormControl';
import { withFormik } from 'formik';

const AddTodo = ({ values, handleChange, handleSubmit, isSubmitting }) => (
  <FormControl style={{ maxWidth: 500, marginBottom: 20 }} component="fieldset">
    <FormGroup>
      <TextField
        style={{ width: 500 }}
        id="outlined-bare"
        value={values.text}
        name="text"
        placeholder="Type text"
        margin="normal"
        variant="outlined"
        onChange={handleChange}
      />
      <Button
        variant="outlined"
        style={{ width: 250, margin: '0 auto' }}
        color="primary"
        onClick={handleSubmit}
        disabled={isSubmitting}
      >
        {isSubmitting ? 'Submitting...' : 'Add'}
      </Button>
    </FormGroup>
  </FormControl>
);
const todosQuery = gql`
  query {
    allTodos {
      id
      text
    }
  }
`;

const addTodoMutation = gql`
  mutation($text: String!) {
    addTodo(text: $text) {
      ok
      todo {
        id
        text
      }
    }
  }
`;

AddTodo.propTypes = {
  values: PropTypes.object.isRequired,
  handleChange: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  isSubmitting: PropTypes.bool.isRequired,
};

export default compose(
  graphql(addTodoMutation),
  withFormik({
    mapPropsToValues: () => ({ text: '' }),
    handleSubmit: async (values, { props: { mutate }, setSubmitting, resetForm }) => {
      if (values.text === '') {
        setSubmitting(false);
        return;
      }
      await mutate({
        variables: {
          text: values.text,
        },
        optimisticResponse: {
          addTodo: {
            __typename: 'Mutation',
            ok: true,
            todo: {
              __typename: 'Todo',
              id: -1,
              text: values.text,
            },
          },
        },
        update: (store, { data: { addTodo } }) => {
          const { ok, todo } = addTodo;
          if (!ok) return;

          const data = store.readQuery({ query: todosQuery });
          data.allTodos.unshift(todo);
          store.writeQuery({ query: todosQuery, data });
        },
      });
      resetForm();
      setSubmitting(false);
    },
  }),
)(AddTodo);
