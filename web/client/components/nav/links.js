import React from 'react';
// icons
import { Dashboard, Inbox } from '@material-ui/icons';

const links = [
  {
    to: '/',
    icon: <Dashboard />,
    title: 'Home',
    exact: true,
  },
  {
    to: '/todo',
    icon: <Inbox />,
    title: 'Todos',
  },
];

export default links;
