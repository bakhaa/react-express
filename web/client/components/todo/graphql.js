import gql from 'graphql-tag';

const todosQuery = gql`
  query {
    getTodos {
      _id
      text
      descripiton
      created
    }
  }
`;

export { todosQuery };
