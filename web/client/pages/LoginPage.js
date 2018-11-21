import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { graphql, compose } from 'react-apollo';
import gql from 'graphql-tag';
import { withFormik } from 'formik';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import FormControl from '@material-ui/core/FormControl';
import CircularProgress from '@material-ui/core/CircularProgress';
import IconButton from '@material-ui/core/IconButton';
import InputAdornment from '@material-ui/core/InputAdornment';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';

const Wrap = styled.div`
  width: 100%;
  background-color: #034ca6;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  min-height: 700px;
`;

const Top = styled.div`
  margin-bottom: 55px;
  text-align: center;
`;

const Form = styled.div`
  background-color: #ffffff;
  width: 400px;
  height: 390px;
  border-radius: 3px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const GoogleImg = styled.img`
  width: 20px;
  height: 20px;
  margin-right: 5px;
`;

const Error = styled(Typography)`
  text-align: center;
  color: #f44336;
  padding-bottom: 10px;
`;

const Bottom = styled.div`
  margin-top: 55px;
  height: 20px;
`;

class LoginPage extends PureComponent {
  constructor(props) {
    super(props);
    this.state = { showPassword: false };

    this.onChangeShowPassword = this.onChangeShowPassword.bind(this);
  }

  onChangeShowPassword() {
    const { showPassword } = this.state;
    this.setState({ showPassword: !showPassword });
  }

  render() {
    const { values, handleChange, handleSubmit, isSubmitting, errors } = this.props;
    const { showPassword } = this.state;
    return (
      <Wrap>
        <Top>
          <Typography style={{ color: '#fff', fontSize: 40, fontWeight: 'bold' }}>
            TODOS
          </Typography>
          <Typography style={{ color: '#fff', fontSize: 25 }}>
            Log in to continue to Todos
          </Typography>
        </Top>
        <FormControl component="fieldset">
          <Form>
            <Button
              variant="outlined"
              style={{ width: 300, height: 50 }}
              color="primary"
              onClick={() => null}
            >
              <GoogleImg src="/public/images/google.jpg" alt="google" />
              <Typography style={{ lineHeight: '20px' }}>Sign up with Google</Typography>
            </Button>
            <Typography style={{ color: '#818181', marginTop: 15 }}>OR</Typography>
            <TextField
              style={{ width: 300, height: 50 }}
              value={values.email}
              name="email"
              placeholder="Enter email"
              margin="normal"
              variant="outlined"
              onChange={handleChange}
            />
            <TextField
              style={{ width: 300, height: 50, marginBottom: 16 }}
              value={values.password}
              type={showPassword ? 'text' : 'password'}
              name="password"
              placeholder="Enter password"
              variant="outlined"
              onChange={handleChange}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="Toggle password visibility"
                      onClick={this.onChangeShowPassword}
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
            {errors.length
              && errors.map((err, idx) => (
                <Error style={{ color: '#f44336' }} key={idx}>
                  {Object.values(err)[0]}
                </Error>
              ))}
            <Button
              variant="contained"
              style={{ width: 300, height: 50, marginTop: 8 }}
              color="primary"
              onClick={handleSubmit}
              disabled={isSubmitting || (!values.email.length || !values.password.length)}
            >
              {isSubmitting ? <CircularProgress style={{ width: 30, height: 30 }} /> : 'Continue'}
            </Button>
          </Form>
        </FormControl>
        <Bottom>
          <Link to="/register" style={{ textDecoration: 'none' }}>
            <Typography style={{ color: '#fff', fontSize: 19 }}>Sign up for an account</Typography>
          </Link>
        </Bottom>
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
