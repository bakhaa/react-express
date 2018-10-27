import React from 'react';
import ErrorPage from '../components/errorPage';

const ServerErrorPage = () => (
  <ErrorPage
    code={500}
    image="/public/images/500.svg"
    description="Server error. Please, try later..."
  />
);

export default ServerErrorPage;
