import React from 'react';
import { Navbar } from 'rsuite';

const navStyle = {
  padding: '18px 20px',
  display: 'inline-block',
  fontSize: '16px',
  fontWeight: 'bold'
};

const Sidebar = () => {
  return (
    <Navbar appearance="subtle">
      <Navbar.Header>
        <a href="#" style={navStyle} >Household Account</a>
      </Navbar.Header>
    </Navbar>
  );
};

export default Sidebar;