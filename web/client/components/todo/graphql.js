import gql from 'graphql-tag';

const todosQuery = gql`
  query getTodos {
    getTodos {
      _id
      text
      descripiton
      created
    }
  }
`;

export { todosQuery };
