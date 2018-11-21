import gql from 'graphql-tag';

const todosQuery = gql`
  query getTodos {
    getTodos {
      _id
      text
      completed
      description
      created
    }
  }
`;

const addTodoMutation = gql`
  mutation($text: String!, $description: String) {
    addTodo(text: $text, description: $description) {
      ok
      todo {
        _id
        text
        completed
        description
        created
      }
    }
  }
`;

const updateTodoMutation = gql`
  mutation updateTodo($_id: String!, $text: String, $description: String, $completed: Boolean) {
    updateTodo(_id: $_id, text: $text, description: $description, completed: $completed) {
      ok
      todo {
        _id
        text
        description
        completed
        created
      }
      errors {
        path
        message
      }
    }
  }
`;

export { todosQuery, addTodoMutation, updateTodoMutation };
