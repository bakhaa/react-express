import React from 'react';
// icons
import { Dashboard, Event } from '@material-ui/icons';

const links = [
  {
    to: '/',
    icon: <Dashboard />,
    title: 'Home',
    exact: true,
  },
  {
    to: '/todo',
    icon: <Event />,
    title: 'Todos',
  },
];

export default links;
