import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';

// screens
import {
  HomePage,
  TodoPage,
  NotFoundPage,
  ServerErrorPage,
  PermissionsDeniedPage,
  LoginPage,
} from './pages';

const ME = gql`
  query Me {
    me {
      email
    }
  }
`;

const RequireAuth = ({ component: Component, ...rest }) => (
  <Query query={ME}>
    {({ loading, error }) => {
      if (!loading && !error) return <Component {...rest} />;
      if (!loading && error) {
        return <Redirect to={{ pathname: '/login' }} />;
      }
      return null;
    }}
  </Query>
);

export default () => (
  <Switch>
    <RequireAuth path="/" exact component={HomePage} />
    <RequireAuth path="/todo" component={TodoPage} />
    <Route path="/login" component={LoginPage} />
    <Route path="/403" component={PermissionsDeniedPage} />
    <Route path="/500" component={ServerErrorPage} />
    <Route path="*" component={NotFoundPage} />
  </Switch>
);
