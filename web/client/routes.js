import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';

import Main from './components/main';

// screens
import {
  NotFoundPage,
  ServerErrorPage,
  PermissionsDeniedPage,
  LoginPage,
  RegisterPage,
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
    {({ loading, error, data }) => {
      if (!loading && !error) {
        return <Component me={data.me} {...rest} />;
      }
      if (!loading && error) {
        return <Redirect to={{ pathname: '/login' }} />;
      }
      return null;
    }}
  </Query>
);

export default () => (
  <Switch>
    <RequireAuth path="/" exact component={Main} />
    <RequireAuth path="/todo" component={Main} />
    <Route path="/login" component={LoginPage} />
    <Route path="/register" component={RegisterPage} />
    <Route path="/403" component={PermissionsDeniedPage} />
    <Route path="/500" component={ServerErrorPage} />
    <Route path="*" component={NotFoundPage} />
  </Switch>
);
