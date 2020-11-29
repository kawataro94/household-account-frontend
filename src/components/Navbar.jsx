import React from 'react';
import { useHistory, useLocation } from "react-router-dom";
import { Navbar, Nav, Icon } from 'rsuite';

const navStyle = {
  padding: '18px 20px',
  display: 'inline-block',
  fontSize: '16px',
  fontWeight: 'bold'
};

const Header = () => {
  const history = useHistory();
  const { pathname } = useLocation();
  const toLink = (to) => {
    history.push(to);
  };

  return (
    <Navbar appearance="subtle">
      <Navbar.Header>
        <a href="#" style={navStyle} >Household Account</a>
      </Navbar.Header>
      <Nav pullRight activeKey={pathname} className='header-link'>
        <Nav.Item eventKey='/' icon={<Icon icon="dashboard" size="2x" />} onClick={() => toLink('/')} ></Nav.Item>
        <Nav.Item eventKey='/records' icon={<Icon icon="table" size="2x" />} onClick={() => toLink('/records')}></Nav.Item>
      </Nav>
    </Navbar>
  );
};

export default Header;