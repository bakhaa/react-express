import React from 'react';
import ErrorPage from '../components/errorPage';

export const NotFoundPage = () => (
  <ErrorPage code={404} image="/public/images/404.svg" description="Woops... Page not found." />
);

export default NotFoundPage;
