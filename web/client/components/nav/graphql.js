import gql from 'graphql-tag';

const logoutMutation = gql`
  mutation logout {
    logout {
      ok
    }
  }
`;

export { logoutMutation };
