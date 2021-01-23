import React from 'react';
import { useHistory, useLocation } from "react-router-dom";
import { Navbar, Nav, Icon } from 'rsuite';
import Axios from 'axios';

import { serverUrl } from '../../.env/resources';

const navStyle = {
  padding: '18px 20px',
  display: 'inline-block',
  fontSize: '16px',
  fontWeight: 'bold'
};

const httpClient = Axios.create({
  withCredentials: true
});

const Header = () => {
  const history = useHistory();
  const { pathname } = useLocation();
  const toLink = (to) => {
    history.push(to);
  };

  const signOut = () => {
    httpClient
      .post(`http://${serverUrl}/member/signout`)
      .then(() => {
        toLink('/signin');
      });
  };

  return (
    <Navbar appearance="subtle">
      <Navbar.Header>
        <a href="#" style={navStyle} >Household Account</a>
      </Navbar.Header>
      <Nav pullRight activeKey={pathname} >
        <Nav.Item className='mobile-menu' eventKey='/' icon={<Icon icon="dashboard" size="2x" />} onClick={() => toLink('/')} ></Nav.Item>
        <Nav.Item className='mobile-menu' eventKey='/records' icon={<Icon icon="table" size="2x" />} onClick={() => toLink('/records')}></Nav.Item>
        <Nav.Item icon={<Icon icon="sign-out" size="2x" />} onClick={() => signOut()}></Nav.Item>
      </Nav>
    </Navbar>
  );
};

export default Header;