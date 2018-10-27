import React from 'react';
import ErrorPage from '../components/errorPage';

const NotFoundPage = () => (
  <ErrorPage code={404} image="/public/images/404.svg" description="Oops... Page not found." />
);

export default NotFoundPage;
