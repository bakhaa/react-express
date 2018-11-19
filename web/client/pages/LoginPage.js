import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { graphql, compose } from 'react-apollo';
import gql from 'graphql-tag';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import FormGroup from '@material-ui/core/FormGroup';
import FormControl from '@material-ui/core/FormControl';
import { withFormik } from 'formik';
import styled from 'styled-components';

const Wrap = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Error = styled.div`
  text-align: center;
  color: #f44336;
  padding-bottom: 10px;
`;

class LoginPage extends PureComponent {
  render() {
    const { values, handleChange, handleSubmit, isSubmitting, errors } = this.props;

    return (
      <Wrap>
        <FormControl style={{ maxWidth: 500, marginBottom: 20 }} component="fieldset">
          <FormGroup>
            <TextField
              style={{ width: 500 }}
              value={values.email}
              name="email"
              placeholder="Email"
              margin="normal"
              variant="outlined"
              onChange={handleChange}
            />
            <TextField
              style={{ width: 500 }}
              value={values.password}
              name="password"
              placeholder="Password"
              margin="normal"
              variant="outlined"
              onChange={handleChange}
            />
            {errors.length
              && errors.map((err, idx) => <Error key={idx}>{Object.values(err)[0]}</Error>)}
            <Button
              variant="outlined"
              style={{ width: 250, margin: '0 auto' }}
              color="primary"
              onClick={handleSubmit}
              disabled={isSubmitting || (!values.email.length || !values.password.length)}
            >
              {isSubmitting ? 'Submitting...' : 'LOGIN'}
            </Button>
          </FormGroup>
        </FormControl>
      </Wrap>
    );
  }
}

const loginMutation = gql`
  mutation($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      ok
      errors {
        message
        path
      }
    }
  }
`;

LoginPage.propTypes = {
  values: PropTypes.object.isRequired,
  handleChange: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  isSubmitting: PropTypes.bool.isRequired,
  errors: PropTypes.any,
};

export default compose(
  graphql(loginMutation),
  withFormik({
    mapPropsToValues: () => ({ email: '', password: '' }),
    handleSubmit: async (
      values,
      { props: { history, mutate }, setSubmitting, resetForm, setErrors },
    ) => {
      if (values.email === '' || values.password === '') {
        setSubmitting(false);
        return;
      }
      const response = await mutate({
        variables: {
          email: values.email,
          password: values.password,
        },
      });
      const {
        data: {
          login: { errors, ok },
        },
      } = response;

      if (ok) {
        history.push('/');
        return;
      }

      const errs = errors.map(err => ({ [err.path]: err.message }));

      resetForm({ email: values.email, password: '' });
      setSubmitting(false);
      setErrors([...errs]);
    },
  }),
)(LoginPage);
