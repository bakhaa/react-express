import React from 'react';
import ErrorPage from '../components/errorPage';

const PermissionsDeniedPage = () => (
  <ErrorPage code={403} image="/public/images/403.svg" description="Permissions denied." />
);

export default PermissionsDeniedPage;
