import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { graphql, compose } from 'react-apollo';
import gql from 'graphql-tag';
import { withFormik } from 'formik';
import * as Yup from 'yup';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
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
`;

const Bottom = styled.div`
  margin-top: 55px;
  height: 20px;
`;

const fieldStyle = { width: 300, height: 50, marginBottom: 8, marginTop: 8 };

class RegisterPage extends PureComponent {
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
    const {
      values,
      handleChange,
      handleSubmit,
      handleBlur,
      isSubmitting,
      errors,
      touched,
      status,
    } = this.props;
    const { showPassword } = this.state;

    return (
      <Wrap>
        <Top>
          <Typography style={{ color: '#fff', fontSize: 40, fontWeight: 'bold' }}>TODOS</Typography>
          <Typography style={{ color: '#fff', fontSize: 25 }}>
            Sign up to continue to Todos
          </Typography>
        </Top>
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
            style={fieldStyle}
            value={values.email}
            name="email"
            placeholder="Enter email"
            error={errors.email && (touched.email || (status && status.submitted))}
            margin="normal"
            variant="outlined"
            onChange={handleChange}
            onBlur={handleBlur}
          />
          {errors.email && (touched.email || (status && status.submitted)) && (
            <Error style={{ color: '#f44336' }}>{errors.email}</Error>
          )}
          <TextField
            style={fieldStyle}
            value={values.password}
            type={showPassword ? 'text' : 'password'}
            name="password"
            error={errors.password && (touched.password || (status && status.submitted))}
            placeholder="Enter password"
            variant="outlined"
            onChange={handleChange}
            onBlur={handleBlur}
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
          {errors.password && (touched.password || (status && status.submitted)) && (
            <Error style={{ color: '#f44336' }}>{errors.password}</Error>
          )}
          <Button
            variant="contained"
            style={{ width: 300, height: 50, marginTop: 16 }}
            color="primary"
            onClick={handleSubmit}
            disabled={
              isSubmitting
              || !!(errors.email || errors.password)
              || (!values.email.length || !values.password.length)
            }
          >
            {isSubmitting ? <CircularProgress style={{ width: 30, height: 30 }} /> : 'Continue'}
          </Button>
        </Form>
        <Bottom>
          <Link to="/login" style={{ textDecoration: 'none' }}>
            <Typography style={{ color: '#fff', fontSize: 19 }}>Log in for an account</Typography>
          </Link>
        </Bottom>
      </Wrap>
    );
  }
}

const registerMutation = gql`
  mutation($email: String!, $password: String!) {
    register(email: $email, password: $password) {
      ok
      errors {
        message
        path
      }
    }
  }
`;

RegisterPage.propTypes = {
  values: PropTypes.object.isRequired,
  handleChange: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  handleBlur: PropTypes.func.isRequired,
  touched: PropTypes.object.isRequired,
  isSubmitting: PropTypes.bool.isRequired,
  errors: PropTypes.any,
  status: PropTypes.any,
};

export default compose(
  graphql(registerMutation),
  withFormik({
    mapPropsToValues: () => ({ email: '', password: '' }),
    handleSubmit: async (
      values,
      { props: { history, mutate }, setSubmitting, setStatus, resetForm, setErrors },
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
          register: { errors, ok },
        },
      } = response;

      if (ok) {
        history.push('/login');
        return;
      }

      resetForm({ email: values.email, password: '' });
      setSubmitting(false);
      setErrors({ [errors[0].path]: errors[0].message });
      setStatus({ submitted: true });
    },
    validationSchema: Yup.object().shape({
      password: Yup.string()
        .min(5, 'Your password must be at least 5 characters long')
        .max(25, 'Your passwords must be 25 characters or less')
        .required('Password is required'),
      email: Yup.string()
        .email('Invalid email address')
        .required('Email is required'),
    }),
    // {
    //   const errors = {};
    //   if (!values.email) {
    //     errors.email = 'Email is required';
    //   } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    //     errors.email = 'Invalid email address';
    //   }

    //   if (!values.password) {
    //     errors.password = 'Password is required';
    //   }
    //   return errors;
    // },
  }),
)(RegisterPage);
