import React from 'react';
import { NavLink } from 'react-router-dom';
import styled from 'styled-components';

const NavWrapper = styled.nav`
  height: 50px;
  width: 100%;
`;

const Nav = () => (
  <NavWrapper>
    <NavLink exact to="/">Home</NavLink>
    <NavLink to="/list">List</NavLink>
  </NavWrapper>
);

export default Nav;
