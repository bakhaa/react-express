import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Typography from '@material-ui/core/Typography';

const ErrorContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const StatusCode = styled(Typography)`
  && {
    margin-top: 0;
    margin-bottom: 10px;
    color: #162c4d;
    font-weight: bold;
    font-size: 45px;
  }
`;

const StatusDescription = styled(Typography)`
  && {
    margin-top: 0;
    margin-bottom: 50px;
    font-weight: normal;
    color: #162c4d;
    font-size: 35px;
  }
`;

export const ErrorPage = ({ code, description, image }) => (
  <ErrorContainer>
    <StatusCode>{code}</StatusCode>
    <StatusDescription>{description}</StatusDescription>
    <img src={image} alt="error page" />
  </ErrorContainer>
);

ErrorPage.propTypes = {
  code: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  description: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
};

export default ErrorPage;
